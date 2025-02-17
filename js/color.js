// /js/color.js

document.addEventListener('DOMContentLoaded', () => {
    // Farbpalette: Schalter und Container
    const colorToggle = document.getElementById('color-toggle');
    const colorPalette = document.getElementById('color-palette');
    
    if (colorToggle && colorPalette) {
      // Umschalten der Sichtbarkeit der Farbpalette beim Klick
      colorToggle.addEventListener('click', () => {
        if (colorPalette.style.display === 'none' || colorPalette.style.display === '') {
          colorPalette.style.display = 'block';
        } else {
          colorPalette.style.display = 'none';
        }
      });
    }
    
    // Event-Listener für die Color-Picker, um CSS-Variablen zu ändern
    const primaryColorPicker = document.getElementById('primary-color-picker');
    const accentColorPicker = document.getElementById('accent-color-picker');
    const backgroundColorPicker = document.getElementById('background-color-picker');
  
    if (primaryColorPicker) {
      primaryColorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--primary-color', e.target.value);
        updateParticlesColors();
      });
    }
    
    if (accentColorPicker) {
      accentColorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--accent-color', e.target.value);
        updateParticlesColors();
      });
    }
    
    if (backgroundColorPicker) {
      backgroundColorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--background-color', e.target.value);
        // Bei Hintergrundwechsel wird ggf. das Body-Background (über CSS) automatisch aktualisiert.
      });
    }
    
    // Funktion, um Particles.js mit den neuen Farben neu zu initialisieren
    function updateParticlesColors() {
      // Hole die neuen Farben aus den CSS-Variablen
      const newPrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      const newAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
      
      // Erstelle ein neues Konfigurationsobjekt, das die aktuellen Farbwahlen einsetzt
      const config = {
        particles: {
          number: {
            value: 140,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: newPrimary
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: newAccent,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 160,
              duration: 0.6
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      };
  
      // Falls bereits ein Particles-Objekt existiert, zerstöre es
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
      // Initialisiere Particles.js mit der neuen Konfiguration
      particlesJS("particles-js", config);
    }
  });
  