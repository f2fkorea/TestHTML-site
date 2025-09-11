// 버튼 ripple(가벼운 포인터 반응)
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('pointerdown', e=>{
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - r.left}px`);
    btn.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
});

// 다크모드 토글 + 저장
const root = document.documentElement;
const KEY = 'theme';
const saved = localStorage.getItem(KEY);
if (saved === 'dark') root.classList.add('dark');

const toggle = document.getElementById('themeToggle');
const paintIcon = () => toggle.textContent = root.classList.contains('dark') ? '🌞' : '🌙';
paintIcon();

toggle.addEventListener('click', ()=>{
  root.classList.toggle('dark');
  localStorage.setItem(KEY, root.classList.contains('dark') ? 'dark' : 'light');
  paintIcon();
});

// 스크롤 리빌 애니메이션
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
},{ threshold: .12 });

document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// 스크롤 시 “맨 위로” 버튼
const toTop = document.getElementById('toTop');
const onScroll = ()=>{
  if (window.scrollY > 280) toTop.classList.add('show');
  else toTop.classList.remove('show');
};
window.addEventListener('scroll', onScroll);
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
onScroll();