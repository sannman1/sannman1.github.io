// Smooth scroll for navbar links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// Sticky header shadow on scroll
const header = document.querySelector('header');
const offsetForHeader = 20;
window.addEventListener('scroll', () => {
	if (!header) return;
	if (window.scrollY > offsetForHeader) header.classList.add('scrolled');
	else header.classList.remove('scrolled');
	scrollSpy();
});

// ScrollSpy: highlight current section link
function scrollSpy(){
	const sections = document.querySelectorAll('section[id]');
	const scrollPos = window.scrollY + (window.innerHeight/3);
	sections.forEach(sec => {
		const top = sec.offsetTop;
		const bottom = top + sec.offsetHeight;
		const id = sec.getAttribute('id');
		const link = document.querySelector(`nav a[href="#${id}"]`);
		if (!link) return;
		if (scrollPos >= top && scrollPos < bottom) link.classList.add('active');
		else link.classList.remove('active');
	});
}

// Reveal on scroll for .reveal elements
const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('active');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Initial call for scrollspy on load
document.addEventListener('DOMContentLoaded', () => {
	scrollSpy();
});
