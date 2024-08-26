import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Steven Hagene - Senior Software Developer & UX Engineer</title>
        <meta name="description" content="Portfolio of Steven Hagene, a Senior Software Developer and UX Engineer with expertise in full-stack development and design systems architecture." />
        <meta name="keywords" content="Steven Hagene, Software Developer, UX Engineer, Full-Stack Development, Design Systems" />
        <meta name="author" content="Steven Hagene" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.stevenhagene.com" />
      </Head>
      <main className="min-h-screen">
        <Header />
        <section className="hero relative text-navy-blue dark:text-white flex items-center overflow-hidden pt-24">
          <div className="container mx-auto text-center relative z-10 flex flex-col md:flex-row items-center justify-center py-16">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <Image
                src="/photo.jpg" 
                alt="Steven Hagene - Senior Software Developer and UX Engineer"
                width={250}
                height={250}
                className="rounded-full border-4 border-usmc-scarlet dark:border-usmc-gold shadow-lg"
              />
            </div>
            <div className="md:w-2/3 md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Steven Hagene</h1>
              <p className="text-xl md:text-2xl mb-8">Bridging Technology and Design for Exceptional User Experiences</p>
              <a href="#projects" className="bg-usmc-scarlet hover:bg-usmc-gold text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg inline-block">
                View Portfolio
              </a>
            </div>
          </div>
        </section>
        <Skills />
        <Projects />
        <Experience />
        <ContactForm />
      </main>
    </>
  )
}