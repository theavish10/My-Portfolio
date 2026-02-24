document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TYPING ANIMATION (LOOP)
  ========================= */

  const roles = [
    "Frontend Developer",
    "UI Builder",
    "Web Enthusiast",
    "Problem Solving"
  ];

  const typingEl = document.querySelector(".typing");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 50;
  const delayBetweenRoles = 1200;

  function typeEffect() {
    if (!typingEl) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex++);
      if (charIndex > currentRole.length) {
        setTimeout(() => isDeleting = true, delayBetweenRoles);
      }
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }

  typeEffect();


  /* =========================
     SCROLL REVEAL
  ========================= */

  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  /* =========================
     DARK / LIGHT MODE
  ========================= */

  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (toggleBtn) {
    const icon = toggleBtn.querySelector("i");

    if (localStorage.getItem("theme") === "light") {
      body.classList.add("light-mode");
      icon.classList.replace("fa-moon", "fa-sun");
    }

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-mode");

      if (body.classList.contains("light-mode")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  
/* =========================
   DYNAMIC MODAL LOGIC
========================= */
const modal = document.getElementById("projectModal");
const closeModal = document.querySelector(".close-modal");
const viewBtns = document.querySelectorAll(".view-details");

// Modal ke andar ke elements
const mTitle = document.getElementById("modalTitle");
const mDesc = document.getElementById("modalDescription");
const mTech = document.getElementById("modalTech");
const mVisit = document.getElementById("modalVisit");
const mAchievements = document.getElementById("modalAchievements")

viewBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Page jump rokne ke liye

    // 1. Button se data nikaalo
    const title = btn.getAttribute("data-title");
    const desc = btn.getAttribute("data-desc");
    const techArray = btn.getAttribute("data-tech").split(","); 
    const link = btn.getAttribute("data-link");
    const achievementsData = btn.getAttribute("data-achievements");
    const achievementsArray = achievementsData ? achievementsData.split(";") : [];

    // 2. Modal mein data set karo
    mTitle.innerText = title;
    mDesc.innerText = desc;
    mVisit.href = link;

    // 3. Tech tags ko loop karke add karo
    mTech.innerHTML = ""; // Purane tags saaf karo
    techArray.forEach(tech => {
      const span = document.createElement("span");
      span.innerText = tech.trim();
      mTech.appendChild(span);
    });

    mAchievements.innerHTML = ""; // Purana data clear karo
    achievementsArray.forEach(point => {
      if(point.trim() !== "") { // Khali points skip karne ke liye
        const li = document.createElement("li");
        li.innerText = point.trim();
        mAchievements.appendChild(li);
      }
    });
    
    // 4. Modal dikhao
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Background scroll stop
  });
});

// Modal close karne ka logic
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
});

// Bahar click karne pe close ho jaye
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});

  /* =========================
     SCROLL TO TOP BUTTON
  ========================= */

  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.pointerEvents = "auto";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.pointerEvents = "none";
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});
