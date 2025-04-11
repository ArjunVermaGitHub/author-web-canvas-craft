
import React from 'react';

const AuthorSection = () => {
  return (
    <section className="book-section bg-book-brown">
      <div className="container mx-auto">
        <h2 className="section-heading">Meet the Author</h2>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-book-gold">
              <img 
                src="/lovable-uploads/15e53108-74da-4f2a-9970-a84ae327b6cf.png" 
                alt="Rituraj - Author" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3 text-book-light">
            <p className="text-lg leading-relaxed">
              Rituraj is a dreamer, creator, and storyteller who weaves ancient symbols, scientific speculation, 
              and myth into a thrilling adventure. Passionate about the hidden patterns of the universe 
              and the mysteries of human consciousness, Rituraj invites readers to imagine a world 
              beyond what we see.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
