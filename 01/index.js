import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "aqui la api";
const genAI = new GoogleGenerativeAI(API_KEY);

async function main() {
  try {
    // Obtener argumentos de la línea de comandos
    const args = process.argv.slice(2);
    const prompt = args.length > 0 
      ? args.join(" ") 
      : "Explain how AI works in a few words";
    
    if (args.length === 0) {
      console.log("💡 Tip: Puedes hacer preguntas así: node index.js \"tu pregunta aquí\"\n");
    }
    
    console.log("🤖 Preguntando a Gemini...");
    console.log(`📝 Pregunta: ${prompt}\n`);
    
    // Intentar con gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✨ Respuesta de Gemini:");
    console.log("─".repeat(50));
    console.log(text);
    console.log("─".repeat(50));
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error("\nDetalles del error:");
    console.error(`- Status: ${error.status || 'N/A'}`);
    console.error(`- StatusText: ${error.statusText || 'N/A'}`);
    
    if (error.status === 404) {
      console.log("\n⚠️  PROBLEMA: Tu API key no tiene acceso a los modelos de Gemini.");
      console.log("\n📝 SOLUCIÓN:");
      console.log("1. Ve a: https://aistudio.google.com/app/apikey");
      console.log("2. Crea una nueva API key");
      console.log("3. Reemplaza la clave en el archivo index.js");
      console.log("\n💡 La API key actual puede estar expirada o sin permisos.");
    } else if (error.status === 403) {
      console.log("\n⚠️  PROBLEMA: Acceso denegado.");
      console.log("- Verifica que la API esté habilitada en tu proyecto de Google Cloud");
    } else {
      console.log("\n🔍 Revisa tu conexión a internet y la configuración de la API.");
    }
  }
}

await main();