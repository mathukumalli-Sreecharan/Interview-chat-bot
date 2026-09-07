from langchain import LLMChain, PromptTemplate
from langchain.llms import HuggingFacePipeline
from transformers import pipeline

# Hugging Face Pipeline for text generation
hf_pipeline = pipeline(
    "text-generation",
    model="gpt2",
    max_length=300
)

llm = HuggingFacePipeline(pipeline=hf_pipeline)

prompt_template = PromptTemplate(
    input_variables=["resume_text"],
    template="Based on this resume, generate 5 interview questions:\n{resume_text}\nQuestions:"
)

llm_chain = LLMChain(prompt=prompt_template, llm=llm)

def generate_interview_questions(resume_text: str):
    response = llm_chain.run(resume_text=resume_text)
    lines = response.split("\n")
    questions = [line.strip() for line in lines if line.strip().endswith('?')]

    if len(questions) == 0:
        questions = [
            "Tell me about yourself?",
            "What are your core strengths?",
            "Why do you want to work in this role?",
            "What challenges did you face in your last job?",
            "How do you handle pressure?"
        ]

    return questions[:5]
