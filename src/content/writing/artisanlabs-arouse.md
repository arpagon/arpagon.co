---
title: 'De RisePal a ArtisanLabs: Innovación en la Era de la IA de Consumo'
date: '2023-11-11'
lang: es
description: Exploramos el viaje de Risepal a ArtisanLabs y cómo la innovación en la era de la IA de consumo está redefiniendo el desarrollo tecnológico. Desde la creación de Arouse con tecnologías avanzadas hasta la reflexión…
series: artisanlabs
originalUrl: https://blog.artisanlabs.io/posts/arouse
cover: /media/writing/d28bc85fee2a00a1.webp
translationKey: artisanlabs-arouse
---

## Introducción
En [ArtisanLabs](https://artisanlabs.io), nuestra pasión es impulsar la frontera de la innovación tecnológica. Esta aventura comenzó con [Risepal](https://www.risepal.com/), una startup que co-fundé con la visión de empoderar a profesionales en el mercado tech de EE.UU. Con la creación de [Arouse](https://arouse.risepal.com), un asistente de IA, buscamos transformar la forma en que los candidatos interactúan y aprovechan las oportunidades en este sector dinámico. En enero, como co-fundador y CTO de [Risepal](https://www.risepal.com/), utilicé mi experiencia en IA y Machine Learning para desarrollar [Arouse](https://arouse.risepal.com/), un asistente inteligente que se convirtió en el corazón de nuestra plataforma. Meses de trabajo y desarrollo culminaron en un sistema que ayudaba a nuestros usuarios a navegar y aprovechar nuestra extensa base de conocimiento. Sin embargo, el reciente desarrollo de herramientas como [GPTs](https://openai.com/blog/introducing-gpts) y [Assistants API Beta](https://platform.openai.com/docs/assistants/overview/agents) de OpenAI ha reformulado nuestras percepciones sobre la creación, implementación y el futuro de la tecnología en la era de la IA de consumo. Este artículo es un viaje por esos aprendizajes y reflexiones.

## Desarrollo de Arouse
<!-- Embedding a video in the blog post -->
<video controls playsinline preload="none">
  <source src="/media/writing/02f4c366272dfd67.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
<p align="center"><small><a href="https://arouse.risepal.com/">arouse.risepal.com</a></small></p>


El desarrollo de [Arouse](https://arouse.risepal.com) integró tecnologías de [ingenieria de AI](https://www.latent.space/p/ai-engineer) y aprendizaje automático, un proceso que nos llevó aproximadamente dos meses con un dedicado equipo de ingeniería. Implementamos el sistema [RAG (Retrieval Augmented Generation)](https://arxiv.org/abs/2005.11401), en ese entonces una metodología novedosa y aún sin un nombre establecido, que fusionaba modelos de recuperación de información con modelos generativos.

Utilizamos [Supabase](https://supabase.io) y [PgVector](https://github.com/ankane/pgvector) para gestionar embeddings de vectores, lo que permitió análisis semánticos complejos y personalizados en [Arouse](https://arouse.risepal.com). También exploramos el uso de [Langchain](https://langchain.dev/), aún en sus etapas iniciales, para entender mejor el potencial de estos sistemas.

El diseño y desarrollo del frontend, utilizando [Vue.js](https://vuejs.org/), presentó desafíos únicos, especialmente al integrar estas tecnologías emergentes en una interfaz de usuario intuitiva. Este proyecto no solo fue un logro técnico, sino también una aventura en la vanguardia de la IA.


## El Cambio con la Tecnología de OpenAI y su Jardin Amurallado
![Walled Garden Diagram](/media/writing/b95a7d4d6b7ce67c.webp)

### OpenAI DevDay
El [DevDay de OpenAI](https://devday.openai.com/) presentó los [GPTs](https://openai.com/blog/introducing-gpts) y [Assistants API Beta](https://platform.openai.com/docs/assistants/overview/agents), marcando un avance significativo en la accesibilidad y personalización de la IA. Estas herramientas ofrecen soluciones personalizadas eficientes, permitiendo a los usuarios crear versiones de ChatGPT para diversos propósitos.

### Avance Tecnológico vs. Experiencia Previa
La realidad sorprendente que enfrentamos es que lo que nos llevó meses de desarrollo intensivo en [Risepal](https://www.risepal.com/), como la creación de nuestro asistente [Arouse](https://arouse.risepal.com) utilizando sistemas como RAG, pudimos replicarlo en minutos con los GPTs de OpenAI. Esta experiencia, donde integramos nuestra extensa base de conocimiento en el proceso, no solo nos llenó de asombro, sino también de ansiedad. Nos hizo reflexionar profundamente sobre el valor del trabajo humano en la era del rápido progreso tecnológico.

### Problemas y Dependencia
Además, emerge la noción del [jardín amurallado](https://medium.com/@EricVogelpohl/openais-first-devdays-my-take-2416dee817be) con estos avances, donde la dependencia en un ecosistema único y la opacidad de estos sistemas plantean preocupaciones sobre la autonomía tecnológica y la transparencia.

## Reflexiones y Dilemas
![refelct](/media/writing/b8863eb73f5722ff.webp)

### Equilibrando Innovación y Autonomía
Nos encontramos en un punto crítico, donde la eficiencia proporcionada por herramientas como los GPTs de OpenAI debe equilibrarse con la necesidad de transparencia y autonomía en la innovación. La dependencia de soluciones pre-empaquetadas y sistemas opacos plantea interrogantes sobre el control y comprensión de la tecnología que empleamos.

### La Visión de [ArtisanLabs](https://artisanlabs.io): Navegando en la Era de la IA con Autonomía
En [ArtisanLabs](https://artisanlabs.io), nos hacemos eco de las palabras de [Paul Graham](https://twitter.com/paulg/status/1722545536480256079) sobre la importancia del conocimiento profundo y una relación cercana con los usuarios en el ámbito de la IA. Esta filosofía es nuestra respuesta a los desafíos de dependencia y opacidad en la era de la IA de consumo. Al enfocarnos en una comprensión crítica y ética, y al desarrollar una conexión directa con nuestros usuarios, [ArtisanLabs](https://artisanlabs.io) busca construir soluciones innovadoras y sostenibles que trasciendan la dependencia de plataformas de terceros como OpenAI.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Two ways for an AI company to protect itself from competition: (a) depend not just on AI but also deep domain knowledge about a particular field, (b) have a very close relationship with the end users.</p>&mdash; Paul Graham (@paulg) <a href="https://twitter.com/paulg/status/1722545536480256079?ref_src=twsrc%5Etfw">November 9, 2023</a></blockquote>  

## Liberación del Knowledge Base de Risepal
Decidimos liberar nuestro conocimiento acumulado en Risepal, integrándolo con la tecnología GPTs de OpenAI. Esta acción refleja nuestro compromiso con el progreso y la accesibilidad de la información en la era de la IA de consumo.

[Arouse GPTs](https://chat.openai.com/g/g-WBHpMn1pN-risepal-arouse-career-ai)

[![Arouse GPTs](/media/writing/378c872587e03f75.webp)](https://chat.openai.com/g/g-WBHpMn1pN-risepal-arouse-career-ai)
