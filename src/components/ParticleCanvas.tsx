import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const DESKTOP_COUNT = 80;
const MOBILE_COUNT = 40;
const BREAKPOINT = 768;
const CONNECTION_DIST_DESKTOP = 150;
const CONNECTION_DIST_MOBILE = 100;
const SPEED = 0.5;
const RADIUS = 2;
const DPR_CAP = 2;

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animId = 0;
    let width = 0;
    let height = 0;
    let isReducedMotion = false;
    let isVisible = true;
    let connectionDist = CONNECTION_DIST_DESKTOP;

    // 从 CSS 变量读取粒子颜色（每次绘制时读取，主题切换自动生效）
    const getColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        particle:
          styles.getPropertyValue('--particle-color').trim() ||
          'rgba(30, 64, 175, 0.6)',
        line:
          styles.getPropertyValue('--particle-line-color').trim() ||
          'rgba(30, 64, 175, 0.15)',
      };
    };

    // 创建粒子数组
    const createParticles = (count: number): Particle[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        radius: RADIUS,
      }));

    // 更新粒子位置 + 边界反弹
    const update = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        }
        if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        }
        if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }
      }
    };

    // 绘制一帧：连线 + 粒子
    const draw = () => {
      const colors = getColors();
      ctx.clearRect(0, 0, width, height);

      // 连线（先画线，再画点，保证点在最上层）
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = colors.line;
            ctx.globalAlpha = 1 - dist / connectionDist;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // 粒子
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      }
    };

    // 动画循环
    const animate = () => {
      if (!isReducedMotion && isVisible) {
        update();
        draw();
        animId = requestAnimationFrame(animate);
      } else if (isReducedMotion) {
        // 减少动画模式下渲染一帧静止画面
        draw();
      }
    };

    // Canvas 尺寸更新（防抖 100ms）
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // 根据新宽度调整粒子密度和连线距离
        connectionDist =
          width <= BREAKPOINT
            ? CONNECTION_DIST_MOBILE
            : CONNECTION_DIST_DESKTOP;
        const count = width <= BREAKPOINT ? MOBILE_COUNT : DESKTOP_COUNT;
        particles = createParticles(count);
      }, 100);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize(); // 初始设置

    // 性能守护：prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    isReducedMotion = reducedMotionQuery.matches;
    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (!e.matches && isVisible) {
        animId = requestAnimationFrame(animate);
      }
    };
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);

    // 性能守护：标签页可见性
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (!document.hidden && !isReducedMotion) {
        animId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // 性能守护：运行时主题切换 — 强制重绘以覆盖 reduced-motion 等边缘情况
    const colorSchemeQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    const onColorSchemeChange = () => draw();
    colorSchemeQuery.addEventListener('change', onColorSchemeChange);

    // 启动动画
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      clearTimeout(resizeTimer);
      reducedMotionQuery.removeEventListener(
        'change',
        onReducedMotionChange,
      );
      document.removeEventListener('visibilitychange', onVisibilityChange);
      colorSchemeQuery.removeEventListener('change', onColorSchemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 w-full h-full"
    />
  );
}
