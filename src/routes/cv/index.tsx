import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Flex } from "~/components/flex/flex";
import { Grid } from "~/components/grid/grid";
import { GridItem } from "~/components/grid/grid-item";
import { Progress } from "~/components/progress/progress";
import { css } from "~/styled-system/css";

export default component$(() => {
  return (
    <>
      <h1>Curriculum Vitae</h1>
      <h2>Who am I?</h2>
      <Grid columns={2}>
        <div class="article">
          <p>
            As a Senior Software Engineer and Tech Lead at a leading IT company,
            I excel in designing in- novative software solutions, concentrating
            on Software Architecture, IT Security, and Artifi- cial
            Intelligence. My role involves leveraging cutting-edge technologies
            and implementing best practices to deliver high-quality projects,
            ensuring excellence and reliability, that meet the evolving needs of
            the tech industry.
          </p>
        </div>
        <div class="article">
          <Grid columns={2} gap="0.5rem">
            <GridItem class={css({ textAlign: 'end' })}>Fullstack Development</GridItem>
            <Progress value={90} />
            <GridItem class={css({ textAlign: 'end' })}>Software-Architecture</GridItem>
            <Progress value={80} />
            <GridItem class={css({ textAlign: 'end' })}>IT-Security</GridItem>
            <Progress value={60} />
            <GridItem class={css({ textAlign: 'end' })}>Artificial Intelligence</GridItem>
            <Progress value={40} />
            <GridItem class={css({ textAlign: 'end' })}>DevOps / CI-CD</GridItem>
            <Progress value={70} />
            <GridItem class={css({ textAlign: 'end' })}>Agile Development</GridItem>
            <Progress value={50} />
          </Grid>
        </div>
      </Grid>
      <h2>Professional Experience</h2>
      <div class="article">
        <section>
          <Grid columns={5}>
            <GridItem class={css({ alignSelf: 'center' })}>8/2021 - present</GridItem>
            <GridItem colSpan={4}>
              <Flex justify="space-between">
                <h3>Senior Software Engineer - Tech Lead</h3>
                <h4>Abraxas Informatik AG</h4>
              </Flex>
              At Abraxas Informatik AG, I currently serve as a Senior Software
              Engineer on the development of enterprise-grade chatbot solutions
              with specialization in Software Archi- tecture, IT Security, and
              Artificial Intelligence. I am instrumental in creating and
              refining secure, user-friendly solutions with advanced AI
              capabilities to meet the complex needs of our clients.
            </GridItem>
          </Grid>
        </section>
        <section>
          <Grid columns={5}>
            <GridItem class={css({ alignSelf: 'center' })}>1/2020 - 7/2021</GridItem>
            <GridItem colSpan={4}>
              <Flex justify="space-between">
                <h3>Software Engineer - Fullstack</h3>
                <h4>Abraxas Informatik AG</h4>
              </Flex>
              At Abraxas Informatik AG, I served as a Full Stack Developer,
              crafting enterprise applications for both frontend and backend
              needs. Our primary mission was delivering tailored software
              solutions for the public sector and government clients. I was
              instrumental in developing scalable, secure, and user-centric
              products, ensuring they aligned with stringent standards and
              client expectations.
            </GridItem>
          </Grid>
        </section>
        <section>
          <Grid columns={5}>
            <GridItem class={css({ alignSelf: 'center' })}>9/2015 - 12/2019</GridItem>
            <GridItem colSpan={4}>
              <Flex justify="space-between">
                <h3>IT Administrator & Software Engineer</h3>
                <h4>coatmaster AG</h4>
              </Flex>
              At coatmaster AG, I was responsible for overseeing diverse IT
              domains including network infras- tructure, cloud services, and
              hardware. I also develop customized software solutions to optimize
              our products and address customer requirements. My role involves
              ensuring seamless integration and continual refinement of IT
              processes to maintain operational efficiency and relevance in the
              changing tech environment.
            </GridItem>
          </Grid>
        </section>
      </div>
      <h2>Academic Credentials</h2>
      <div class="article">
        <section>
          <Grid columns={5}>
            <GridItem class={css({ alignSelf: 'center' })}>2/2024 - present</GridItem>
            <GridItem colSpan={4}>
              <Flex justify="space-between">
                <h3>Lecturer for Cryptography & Security - CDS207</h3>
                <h4>University of Applied Sciences of the Grisons (FHGR)</h4>
              </Flex>
              Together with two co-lecturers, I teach courses on modern
              cryptography and cybersecurity at FHGR in Chur. Our curriculum
              encompasses cryptographic algorithms, information security, cyber
              threats, and practical labs focused on ethical hacking.
            </GridItem>
          </Grid>
        </section>
        <section>
          <Grid columns={5}>
            <GridItem class={css({ alignSelf: 'center' })}>9/2015 - 7/2021</GridItem>
            <GridItem colSpan={4}>
              <Flex justify="space-between">
                <h3>Bachelor of Science (B.Sc.) - Computer Science</h3>
                <h4>Zurich University of Applied Sciences (ZHAW)</h4>
              </Flex>
              I earned a part-time Bachelor's in Computer Science from the
              School of Engineering, ZHAW, with a focus on information
              engineering and data science. My thesis explored separating
              parallel ut- terances in audio recordings in NLP. Simultaneously,
              I applied theoretical knowledge to practical use as a part-time
              Software Engineer, gaining insights in software development and
              data analysis.
            </GridItem>
          </Grid>
        </section>
      </div>
      <Grid columns={5}>
        <GridItem>
          <h2>Languages</h2>
          <section class="article">
            <p>German - native</p>
            <p>English - proficient</p>
          </section>
        </GridItem>
        <GridItem colSpan={4}>
          <h2>Hobbies</h2>
          <section class="article">
            In my leisure time, I maintain an active lifestyle with a keen
            interest in sports and regular gym sessions, and I enjoy enriching
            my knowledge and perspectives by listening to a diverse range of
            podcasts and delving into books.
          </section>
        </GridItem>
      </Grid>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
