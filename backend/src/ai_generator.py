import os
import json
import google.generativeai as genai
from typing import Dict, Any
from dotenv import load_dotenv

# --- Configuration ---
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set.")

genai.configure(api_key=GOOGLE_API_KEY)


def generate_challenge_with_ai(difficulty: str) -> Dict[str, Any]:
    """
    Generates an Object-Oriented Programming challenge using the Gemini API.
    """
    prompt = f"""
    You are an expert Object-Oriented Programming (OOP) interviewer.
    Your task is to create a single, insightful multiple-choice question to assess a candidate's
    deep understanding of OOP principles, appropriate for the specified difficulty level: '{difficulty}'.

    The question should focus on core OOP concepts such as Encapsulation, Inheritance, Polymorphism,
    Abstraction, Composition, Aggregation, or SOLID principles. For a 'Hard' difficulty,
    consider questions about design patterns or subtle distinctions between concepts.

    *** IMPORTANT INSTRUCTIONS ***
    1. If the question requires a code snippet (in a language like Python, Java, or C++) to illustrate a concept,
       you MUST embed the full code snippet directly inside the "title" field.
    2. Format all code snippets using Markdown backticks, like ```python\\n# your code here\\n```.
    3. Your response MUST be a single, raw JSON object without any extra text, explanations,
       or markdown formatting around the JSON itself.

    The JSON object must have this exact structure. Note the OOP-focused example in the "title" field:
    {{
        "title": "Which OOP principle is primarily demonstrated when a 'Car' class has a private '_engine' attribute that cannot be accessed directly from outside the class?\\n\\n```python\\nclass Car:\\n    def __init__(self):\\n        self._engine = 'V8'\\n\\n    def start(self):\\n        print(f'Engine {{self._engine}} started.')\\n```",
        "options": ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
        "correct_answer_id": 2,
        "explanation": "Encapsulation is the bundling of data (attributes) and methods that operate on the data into a single unit (a class). It restricts direct access to some of an object's components, which is a key aspect of data hiding."
    }}

    The "correct_answer_id" must be an integer index (from 0 to 3) corresponding to the
    correct item in the "options" array. The incorrect options should be plausible distractors
    that relate to other OOP concepts, testing for precise knowledge.
    """

    try:
        model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
        response = model.generate_content(prompt)
        cleaned_response_text = response.text.strip().replace("```json", "").replace("```", "")
        challenge_data = json.loads(cleaned_response_text)

        required_fields = ["title", "options", "correct_answer_id", "explanation"]
        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field '{field}' in LLM response.")

        if not isinstance(challenge_data["correct_answer_id"], int):
            raise ValueError("'correct_answer_id' must be an integer.")

        return challenge_data

    except Exception as e:
        print(f"An error occurred with the Gemini API or response parsing: {e}")
        # Return a fallback challenge that is guaranteed to be correct
        return {
            "title": "What is the primary purpose of a class constructor in OOP?",
            "options": [
                "To destroy the object",
                "To initialize the object's state",
                "To perform a class-level operation",
                "To copy the object"
            ],
            "correct_answer_id": 1,
            "explanation": "A constructor is a special method for creating and initializing an object instance of that class. Its primary purpose is to set up the initial state of the object's attributes."
        }


