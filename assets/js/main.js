/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // AI Chatbot functionality
  document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInputField = document.getElementById('chatbot-input-field');
    const chatbotSendBtn = document.getElementById('chatbot-send');

    // Function to append message to chat window
    function appendMessage(message, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      if (sender === 'bot') {
        messageDiv.classList.add('bot-message');
      } else {
        messageDiv.classList.add('user-message');
      }
      messageDiv.textContent = message;
      chatbotMessages.appendChild(messageDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Toggle chatbot window visibility
    chatbotButton.addEventListener('click', () => {
      if (chatbotWindow.style.display === 'flex') {
        chatbotWindow.style.display = 'none';
      } else {
        chatbotWindow.style.display = 'flex';
        chatbotInputField.focus();
      }
    });

    chatbotClose.addEventListener('click', () => {
      chatbotWindow.style.display = 'none';
    });

    // Function to send user message and get AI response
    async function sendMessage() {
      const userMessage = chatbotInputField.value.trim();
      if (!userMessage) return;

      appendMessage(userMessage, 'user');
      chatbotInputField.value = '';
      chatbotInputField.disabled = true;
      chatbotSendBtn.disabled = true;

      // Show loading indicator
      const loadingIndicator = document.getElementById('chatbot-loading');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
      }

      // Check if API key is configured
      const apiKey = CONFIG.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
        // Placeholder response since API key is not set
        setTimeout(() => {
          appendMessage('Hello! This is a Amir Ai response. To enable AI responses, please configure your Gemini API key in assets/js/config.js.', 'bot');
          chatbotInputField.disabled = false;
          chatbotSendBtn.disabled = false;
          chatbotInputField.focus();
          if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
          }
        }, 1000);
        return;
      }

      try {
        // Get selected language
        const languageSelect = document.getElementById('chatbot-language');
        const selectedLanguage = languageSelect ? languageSelect.value : 'en';
        const languageNames = {
          en: 'English',
          es: 'Spanish',
          fr: 'French',
          de: 'German',
          zh: 'Chinese',
          ar: 'Arabic',
          ru: 'Russian',
          hi: 'Hindi',
          ja: 'Japanese',
          ko: 'Korean',
          ku: 'Kurdish Central'
        };
        const languageName = languageNames[selectedLanguage] || 'English';
        const prompt = `Respond in ${languageName}. ${userMessage}`;

        // Call Gemini AI API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        });

        console.log('Gemini API response status:', response.status);
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Gemini API response data:', data);
        const botMessage = data.candidates[0].content.parts[0].text.trim();
        appendMessage(botMessage, 'bot');
      } catch (error) {
        appendMessage('Sorry, there was an error processing your request.', 'bot');
        console.error('Chatbot error:', error);
      } finally {
        chatbotInputField.disabled = false;
        chatbotSendBtn.disabled = false;
        chatbotInputField.focus();
        if (loadingIndicator) {
          loadingIndicator.style.display = 'none';
        }
      }
    }

    // Send message on button click
    chatbotSendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key press
    chatbotInputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    // Voice search functionality
    const chatbotVoiceBtn = document.getElementById('chatbot-voice');
    if (chatbotVoiceBtn) {
      chatbotVoiceBtn.addEventListener('click', () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
          alert('Speech recognition is not supported in this browser. Please use a modern browser like Chrome.');
          return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        const languageSelect = document.getElementById('chatbot-language');
        const selectedLanguage = languageSelect ? languageSelect.value : 'en';
        const langMap = {
          en: 'en-US',
          es: 'es-ES',
          fr: 'fr-FR',
          de: 'de-DE',
          zh: 'zh-CN',
          ar: 'ar-SA',
          ru: 'ru-RU',
          hi: 'hi-IN',
          ja: 'ja-JP',
          ko: 'ko-KR',
          ku: 'ku-IQ' // Kurdish, approximate
        };
        recognition.lang = langMap[selectedLanguage] || 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          chatbotVoiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i>'; // Change icon to indicate listening
          chatbotVoiceBtn.style.backgroundColor = 'red'; // Indicate recording
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          chatbotInputField.value = transcript;
          sendMessage(); // Automatically send the message
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          alert('Speech recognition error: ' + event.error);
        };

        recognition.onend = () => {
          chatbotVoiceBtn.innerHTML = '<i class="bi bi-mic"></i>'; // Reset icon
          chatbotVoiceBtn.style.backgroundColor = ''; // Reset color
        };

        recognition.start();
      });
    }
  });

  // Language switching functionality
  const siteLanguageSelect = document.getElementById('site-language');
  if (siteLanguageSelect) {
    siteLanguageSelect.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      switchLanguage(selectedLang);
      localStorage.setItem('siteLanguage', selectedLang);
    });

    // Load saved language
    const savedLang = localStorage.getItem('siteLanguage') || 'en';
    siteLanguageSelect.value = savedLang;
    switchLanguage(savedLang);
  }

  function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'INPUT' && element.type === 'text') {
          element.placeholder = translations[lang][key];
        } else if (element.classList.contains('typed')) {
          const items = translations[lang][key].split(', ');
          element.setAttribute('data-typed-items', translations[lang][key]);
          // Reinitialize Typed.js if needed
          if (window.Typed) {
            const typedInstance = new Typed(element, {
              strings: items,
              typeSpeed: 100,
              backSpeed: 50,
              backDelay: 2000,
              loop: true
            });
          }
        } else {
          element.innerHTML = translations[lang][key];
        }
      }
    });
  }

  // Make chatbot widget draggable
  const chatbotWidget = document.getElementById('chatbot-widget');
  let isDragging = false;
  let dragOffsetX, dragOffsetY;

  chatbotButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = chatbotWidget.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    e.preventDefault();
  });

  function drag(e) {
    if (isDragging) {
      const x = e.clientX - dragOffsetX;
      const y = e.clientY - dragOffsetY;
      chatbotWidget.style.left = x + 'px';
      chatbotWidget.style.top = y + 'px';
      chatbotWidget.style.bottom = 'auto';
      chatbotWidget.style.right = 'auto';
    }
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }
})();
