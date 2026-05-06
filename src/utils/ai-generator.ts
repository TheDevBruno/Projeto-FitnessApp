import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface GeneratedMeal {
  name: string;
  calories: number;
  macros: {
    p: number; // protein
    c: number; // carbs
    f: number; // fat
  };
  ingredients: {
    item: string;
    qty: number;
    unit: string;
    category: string;
  }[];
}

export async function generateMealPlan(params: {
  calories: number;
  macros: { p: number; c: number; f: number };
  goal: string;
  budget: string;
  prepTime: string;
  mode: 'semanal' | 'diario';
}): Promise<GeneratedMeal[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
    Você é um nutricionista especialista em logística de vida real.
    Gere um plano alimentar de um dia (Café, Almoço, Janta, Lanche) para um usuário com as seguintes metas:
    - Calorias: ${params.calories} kcal
    - Proteína: ${params.macros.p}g
    - Carboidrato: ${params.macros.c}g
    - Gordura: ${params.macros.f}g
    - Objetivo: ${params.goal}
    - Orçamento: ${params.budget}
    - Tempo de Preparo: ${params.prepTime}
    - Modo de Logística: ${params.mode}

    REGRAS:
    1. O total de calorias e macros deve ser o mais próximo possível da meta.
    2. Se o modo for 'semanal', use ingredientes repetidos entre as refeições para otimizar a compra.
    3. Se o orçamento for 'economico', use fontes de proteína baratas (ovo, frango, fígado, moída).
    4. Retorne APENAS um JSON válido no seguinte formato:
    [
      {
        "name": "Nome da Refeição",
        "calories": 0,
        "macros": {"p": 0, "c": 0, "f": 0},
        "ingredients": [
          {"item": "Nome do Ingrediente", "qty": 0, "unit": "g/ml/un", "category": "Proteínas/Hortifruti/Despensa/Laticínios"}
        ]
      }
    ]
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Limpar markdown se houver
    const jsonString = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Falha ao gerar plano alimentar com IA.');
  }
}
