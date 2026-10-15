---
title: 'Extending Workshop Learnings: From Supabase and PGvector to LangChain'
date: '2023-10-10'
lang: en
description: In this post, we explore the key learnings from the "Pgvector to Prod in 2 hours workshop", led by Greg Richardson, an expert on Supabase and PGvector. We delve into the world of Supabase and PGvector, comparing them…
series: artisanlabs
originalUrl: https://blog.artisanlabs.io/posts/supabase-pgvector
cover: /media/writing/9234587eaab2697e.webp
---

This post is available as a [Jupyter Notebook](https://github.com/ArtisanLabs/chatgpt-your-files/blob/main/tools/langchain/main.ipynb).

# Introduction

[Workshop](https://www.ai.engineer/summit/schedule/workshop-supabase)

[Github](https://github.com/supabase-community/chatgpt-your-files/)

[ArtisanLabs Github Fork](https://github.com/ArtisanLabs/chatgpt-your-files/)


In today's fast-paced world of technological innovation, AI engineers need to stay up-to-date on the latest tools and frameworks. This was the central theme of the AI Engineer Summit held from October 8-10, 2023, in San Francisco, California. The summit brought together thought leaders, industry veterans, and budding engineers, all united by their passion for artificial intelligence.

One workshop that stood out was "Pgvector to Prod in 2 hours." The title was both ambitious and exciting: could we build a production-ready web app in just two hours? I was curious to find out, so I signed up for the workshop.

The workshop was led by Greg Richardson, an expert on Supabase and PGvector. He showed us how to use these technologies to create a secure, production-ready web app. The atmosphere in the room was electric as everyone logged into their Supabase accounts and got ready to code.

The workshop was more than just a tutorial; it was a journey through the future of AI applications. As we wrote each line of code, we were not only building a web app but also taking a step closer to answering a pressing question: how can we build AI applications quickly and easily, while still maintaining control over our tech stack?

In the following sections, I'll share some of the key takeaways from the workshop and how it has inspired me to explore beyond conventional boundaries and venture into a new project with LangChain. So let's embark on this journey and learn how to build AI applications quickly and easily.


# Motivation

Diving into the world of Supabase and PGvector through the "Pgvector to Prod in 2 hours" workshop wasn’t a fluke, but a calculated venture. I already had a solid footing in the realm of Artificial Intelligence with LangChain, but as they say, comparison is a great avenue for learning.

I had crafted a Retrieval Augmented Generation (RAG) system with LangChain that has been in production since February. I knew its intricacies and was quite comfortable with what LangChain could offer. So why attend this workshop?

The answer is straightforward: I wanted to see how other tools and approaches compared to what I had already accomplished. Supabase and PGvector were quickly gaining ground in the AI community, and I wanted to see what the buzz was about, and more importantly, how they compared to LangChain in terms of facilitating rapid AI application development.

Greg Richardson, with his well-earned reputation, leading the workshop, was an additional invitation to dip into these new waters. He promised an intensive session where we could get a functioning MVP (Minimum Viable Product) up and running in merely two hours. That’s something I couldn't pass up.

So, with a blend of curiosity and a desire to learn by contrast, I plunged into the workshop. I was ready to see how the technologies discussed in the workshop compared to my experience with LangChain, and if there was anything new and exciting I could bring to my own AI development table.

In the following sections, I'll share how this workshop not only met my expectations but also led me to explore and better understand the differences and similarities between the tools, and how these experiences have enriched my perspective on AI application development.


# Create Embedings

# Summary of Step 3 - Embeddings WorkShop

WorkShop: [Step 3 - Embeddings](https://github.com/supabase-community/chatgpt-your-files/blob/main/README.md#step-3---embeddings)

In Step 3 titled "Embeddings," the objective is to automate the generation of embeddings whenever new rows are added to the document_sections table. Here’s a summarized breakdown of the step:

    Creating SQL Migration:
        A migration file is created using the command npx supabase migration new embed.
        An embed() trigger function is defined which will be used to asynchronously generate embeddings on arbitrary tables using a new embed Edge Function.

    Setting Up Trigger:
        A trigger named embed_document_sections is created to execute the embed() function after an insert operation on the document_sections table.

    Applying Migration:
        The migration is applied to the local database using the command npx supabase migration up.

    Creating Edge Function:
        An Edge function file is created using the command npx supabase functions new embed.
        In the embed/index.ts file, an embedding pipeline is created using Transformers.js, and a function to generate embeddings, generateEmbedding, is defined.

    Configuring Supabase Client:
        Environment variables for Supabase are checked, and a Supabase client is created.
        The Supabase client is configured to inherit the user’s permissions.

    Fetching, Generating, and Updating Embeddings:
        Text content is fetched from the specified table and column.
        Embeddings are generated for each piece of text.
        The respective rows in the table are updated with the generated embeddings.

    Returning Success Response:
        A success response with status 204 is returned upon successful execution of the embedding generation and updating process.

This step is crucial as it sets up the necessary infrastructure for automatically generating and storing embeddings, which is a foundational aspect of making the chat interface interactive and efficient in handling document queries.

```python
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter

from langchain.schema import Document
from langchain.vectorstores import SupabaseVectorStore
from supabase.client import create_client


import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('.') / '../../.env.local'
load_dotenv(dotenv_path=env_path)
```


# Supabase's Use of Deno and Transformers:

    Deno's Advantages:
        Security: Deno is designed with security in mind. It operates in a secure sandbox environment, which means scripts can't access the network, file system, or environment variables without explicit permission. This feature aligns with Supabase's focus on building secure applications​1​.
        Modern JavaScript Features: Deno supports modern JavaScript features out of the box. This makes it easier for developers to write and maintain their code, and it’s particularly useful when working with modern libraries and frameworks like Transformers.js​2​.
        Built-in Tooling: Deno comes with built-in tooling like a test runner, code formatter, and bundler, which can simplify the development process, making it an attractive choice for building web applications quickly and efficiently​3​.

    Transformers.js and Supabase/gte-small Model:
        Transformers.js Compatibility: The Supabase/gte-small model is designed to be compatible with Transformers.js, which is a library for using transformer models in the browser. This compatibility allows for the easy generation of embeddings using the model directly within a web application environment​4​​5​.
        Efficient Text Embedding Generation: The Supabase/gte-small model is utilized for generating text embeddings efficiently and is used in the workshop to facilitate the creation of a chat interface that can interact with documentations​6​.

# With Langchain's we Use of thenlper/gte-small Model:

    General Text Embeddings (GTE): The thenlper/gte-small model, developed by Alibaba DAMO Academy, is based on the BERT framework and is trained on a large-scale corpus of relevant text pairs. This training enables the model to be highly effective in various text embedding tasks such as information retrieval, semantic textual similarity, and text reranking, which could be instrumental in LangChain's use case for text embeddings​7​.

    Performance and Usage: In the Hugging Face description, it's noted that the thenlper/gte-small model has decent performance metrics on text embedding tasks when compared to other popular text embedding models. The provided code example also showcases how to utilize the model to generate text embeddings which can be beneficial in various natural language processing applications​7​.

In summary, while Supabase leverages the modern features and security of Deno alongside the ease of embedding generation provided by Transformers.js and the Supabase/gte-small model, Langchain, on the other hand, might be harnessing the performance and wide domain coverage provided by the thenlper/gte-small model for its text embedding and NLP applications.


```python
model_name = "thenlper/gte-small"
model_kwargs = {'device': 'cpu'}
encode_kwargs = {'normalize_embeddings': False}
hf = HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)

```


The Supabase Python client is used to interact with the Supabase API.
It provides methods for querying and manipulating data in your Supabase database.
It also includes authentication methods for managing users and permissions.



```python
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
```

### Langchain document handling


```python
# Load the text document from the specified path
raw_documents = TextLoader('../../sample-files/roman-empire-1.md').load()

# Initialize a CharacterTextSplitter with a chunk size of 1000 and overlap of 0
# This will split the text into chunks of 1000 characters each, with no overlap between chunks
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)

# Split the loaded documents into chunks using the text splitter
documents = text_splitter.split_documents(raw_documents)
```

### SupabaseVectorStore

```python

vector_store = SupabaseVectorStore.from_documents(
    documents, 
    hf, 
    client=supabase_client, 
    table_name="langchain_documents", 
    query_name="match_langchain_documents_mmr"
)
```

### Maximal Marginal Relevance Searches
This section goes over different options for how to use SupabaseVectorStore as a retriever.

```python
query = "Who was the first emperor of the Roman Empire?"
retriever = vector_store.as_retriever(search_type="mmr")
matched_docs = retriever.get_relevant_documents(query)
for i, d in enumerate(matched_docs):
    print(f"\n## Document {i}\n")
    print(d.page_content)


from langchain.agents.agent_toolkits import create_retriever_tool

tool = create_retriever_tool(
    retriever, 
    "search_about_roman_empire",
    "Searches and returns documents regarding the roman empire."
)
tools = [tool]


from langchain.agents.agent_toolkits import create_conversational_retrieval_agent

from langchain.chat_models import ChatOpenAI
llm = ChatOpenAI(temperature = 0)

agent_executor = create_conversational_retrieval_agent(llm, tools, verbose=True)

result = agent_executor({"input": "Hello, I would like to know about the roman empire."})
```
