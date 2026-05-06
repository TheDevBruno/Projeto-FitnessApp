import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface GeneratedExercise {
  id: string; // From our library
  name: string;
  muscle_group: string;
  sets: number;
  reps: string;
  rest: number; // in seconds
  notes: string;
}

export async function generateWorkout(params: {
  timeInMinutes: number;
  goal: string;
  equipmentIds: string[];
  level: string;
}): Promise<GeneratedExercise[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
    Você é um personal trainer especialista em treinos adaptativos.
    Gere um treino dinâmico para um usuário com:
    - Tempo total: ${params.timeInMinutes} minutos
    - Objetivo: ${params.goal}
    - Equipamentos Disponíveis: ${params.equipmentIds.join(', ')}
    - Nível: ${params.level}

    REGRAS:
    1. Use APENAS exercícios que podem ser realizados com os equipamentos disponíveis.
    2. O treino deve caber exatamente no tempo estipulado (incluindo descansos).
    3. Retorne APENAS um JSON válido no seguinte formato:
    [
      {
        "id": "slug_do_exercicio",
        "name": "Nome do Exercício",
        "muscle_group": "Peito/Costas/etc",
        "sets": 3,
        "reps": "12-15",
        "rest": 60,
        "notes": "Dica de execução curta"
      }
    ]

    Lista de exercícios conhecidos pela nossa biblioteca (use os IDs se possível):
    pushup, diamond_pushup, bench_press_db, goblet_squat, lunge_db, pullup, bent_over_row_db, lateral_raise, bicep_curl_db, tricep_ext_db, plank, deadlift_bb.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonString = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating workout:', error);
    throw new Error('Falha ao gerar treino com IA.');
  }
}
