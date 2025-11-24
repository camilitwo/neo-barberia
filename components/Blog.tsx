'use client';

import { motion } from 'framer-motion';
import { BlogPost } from '@/data/blogPosts';

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const shareToSocial = (platform: string, post: BlogPost) => {
    if (typeof window === 'undefined') return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${post.titulo} - Neo Barbería`);
    
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      instagram: 'https://instagram.com/neobarberia'
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const getCategoryColor = (categoria: string) => {
    const colors: Record<string, string> = {
      'Cuidado': 'bg-accent text-black',
      'Tendencias': 'bg-primary text-black',
      'Técnicas': 'bg-surface text-primary border border-primary',
      'Productos': 'bg-accent/80 text-black',
      'Guías': 'bg-primary/80 text-black'
    };
    return colors[categoria] || 'bg-surface text-primary border border-primary';
  };

  return (
    <section id="blog" className="py-16 sm:py-20 md:py-32 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gradient text-gradient-fallback"
            whileHover={{ scale: 1.02 }}
          >
            Blog Neo Barbería
          </motion.h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-6">
            Tips, tendencias y secretos profesionales para mantener tu estilo impecable
          </p>
          
          <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
            <span className="text-muted text-sm font-semibold">Síguenos para más contenido:</span>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com/neobarberia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-surface hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 rounded-lg flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent text-xl"
              >
                📷
              </motion.a>
              <motion.a
                href="https://facebook.com/neobarberia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-surface hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent text-xl"
              >
                👍
              </motion.a>
              <motion.a
                href="https://twitter.com/neobarberia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-surface hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent text-xl"
              >
                🐦
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(post.categoria)}`}>
                    {post.categoria}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4 text-xs text-muted mb-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="text-primary">✂️</span>
                    {post.autor}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-accent">⏱️</span>
                    {post.tiempoLectura}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.titulo}
                </h3>

                <p className="text-muted text-sm sm:text-base mb-4 line-clamp-2">
                  {post.descripcion}
                </p>

                <p className="text-muted/80 text-xs sm:text-sm mb-5 line-clamp-3 leading-relaxed">
                  {post.contenido}
                </p>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted">{new Date(post.fecha).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => shareToSocial('facebook', post)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Compartir en Facebook"
                      className="w-8 h-8 bg-surface/50 hover:bg-blue-600/20 rounded-lg flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-accent text-sm"
                    >
                      👍
                    </motion.button>
                    <motion.button
                      onClick={() => shareToSocial('twitter', post)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Compartir en Twitter"
                      className="w-8 h-8 bg-surface/50 hover:bg-sky-500/20 rounded-lg flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-accent text-sm"
                    >
                      🐦
                    </motion.button>
                    <motion.button
                      onClick={() => shareToSocial('instagram', post)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Ver en Instagram"
                      className="w-8 h-8 bg-surface/50 hover:bg-pink-600/20 rounded-lg flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-accent text-sm"
                    >
                      📷
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-muted mb-6 text-sm sm:text-base">
            ¿Quieres estar al día con nuestros tips y promociones?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://instagram.com/neobarberia"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent"
            >
              📷 Síguenos en Instagram
            </motion.a>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-black font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent"
            >
              Agenda tu Cita
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
