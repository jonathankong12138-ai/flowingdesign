  const fdReducedMotionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  window.fdProjectPrefersReducedMotion = function fdProjectPrefersReducedMotion() {
    return !!(fdReducedMotionQuery && fdReducedMotionQuery.matches);
  };

  window.fdProjectSetStatusText = function fdProjectSetStatusText(root, text) {
    if (!root || !text) return;
    let status = root.querySelector(':scope > .m-state-text');
    if (!status) {
      status = document.createElement('span');
      status.className = 'm-state-text';
      status.setAttribute('aria-live', 'polite');
      status.setAttribute('aria-atomic', 'true');
      root.appendChild(status);
    }
    status.textContent = text;
  };

  window.fdProjectBackToTop = function fdProjectBackToTop(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const root = document.documentElement;
    const previousScrollBehavior = root ? root.style.scrollBehavior : '';
    if (root) root.style.scrollBehavior = 'auto';
    const scrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (root) root.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    scrollTop();
    window.requestAnimationFrame(scrollTop);
    window.setTimeout(() => {
      scrollTop();
      if (root) root.style.scrollBehavior = previousScrollBehavior;
    }, 120);
    return false;
  };

  window.fdProjectStopContinuousMotion = function fdProjectStopContinuousMotion() {
    window.clearInterval(window.flowNodeTimer);
    window.flowNodeTimer = null;
    window.clearInterval(window.researchQuoteTimer);
    window.researchQuoteTimer = null;
    document.querySelectorAll('[data-mobile-journey] .m-journey-shot').forEach((shot) => {
      if (shot._mobileJourneyShotTimer) {
        window.clearInterval(shot._mobileJourneyShotTimer);
        shot._mobileJourneyShotTimer = null;
      }
    });
    document.querySelectorAll('#c9').forEach((root) => {
      if (root._journeyShotTimer) {
        window.clearInterval(root._journeyShotTimer);
        root._journeyShotTimer = null;
      }
    });
    document.querySelectorAll('video[autoplay]').forEach((video) => {
      if (video.closest('.mobile-393')) video.pause();
    });
  };

  if (fdReducedMotionQuery && fdReducedMotionQuery.addEventListener) {
    fdReducedMotionQuery.addEventListener('change', () => {
      if (window.fdProjectPrefersReducedMotion()) window.fdProjectStopContinuousMotion();
    });
  }

  window.ugcImagePool = [
    '250427_Shokz_London_Marathon_01533 1.webp',
    '250427_Shokz_London_Marathon_01839 1.webp',
    '250427_Shokz_London_Marathon_02027 1.webp',
    '250427_Shokz_London_Marathon_02330 1.webp',
    '250427_Shokz_London_Marathon_02381 1.webp',
    '4Y7A2425 1.webp',
    '4Y7A2517 1.webp',
    '4Y7A3312 1.webp',
    'DSC00398 1.webp',
    'DSC00514 1.webp',
    'DSC00526 1.webp',
    'London Marathon_Shakeout Run_3 1.webp',
    'NA_BOS_WT_Running_Dakotah_022 1.webp',
    'NA_BOS_WT_Running_Dakotah_022 2.webp',
    'OpenRun Pro 2_EK_LDT_Running_UK_17 1.webp',
    'OpenRun Pro 2_LDT_Running_UK_15 1.webp',
    'OpenRun Pro 2_LDT_Running_UK_16 1.webp',
    'OpenRun Pro 2_LDT_Running_UK_4 1.webp',
    'OpenRun Pro 2_LDT_Running_UK_7 1.webp',
    'OpenRun Pro 2_OR_LDT_Running_UK_2 1.webp'
  ];
  window.componentImagePool = [
    'Group 2062151530.webp',
    'Group 2062151531.webp',
    '促销-产品卡-M-1.webp',
    '促销-产品卡-M.webp',
    '北美弹窗-邮箱-Desktop.webp',
    '国际弹窗-Desktop.webp',
    '首页-产品卡-M-1.webp',
    '首页-产品卡-M.webp'
  ];
  window.randomizeUgcWall = function() {
    const wall = document.querySelector('.pillar-ugc-wall');
    if (!wall || !window.ugcImagePool || !window.ugcImagePool.length) return;
    const cols = Array.from(wall.querySelectorAll('.ugc-col'));
    if (!cols.length) return;
    const shuffled = [...window.ugcImagePool].sort(() => Math.random() - 0.5).slice(0, 18);
    cols.forEach((col) => { col.textContent = ''; });
    cols.forEach((col, colIndex) => {
      const track = document.createElement('div');
      track.className = 'material-track';
      const colItems = shuffled.filter((_name, index) => index % cols.length === colIndex);
      [...colItems, ...colItems].forEach((name) => {
        const img = document.createElement('img');
        img.src = window.projectDetailAssetUrl(`ugc素材/${name}`);
        img.alt = '';
        img.loading = 'lazy';
        track.appendChild(img);
      });
      col.appendChild(track);
    });
  };
  window.randomizeComponentWall = function() {
    const wall = document.querySelector('.pillar-component-wall');
    if (!wall || !window.componentImagePool || !window.componentImagePool.length) return;
    const cols = Array.from(wall.querySelectorAll('.component-col'));
    if (!cols.length) return;
    const shuffled = [...window.componentImagePool].sort(() => Math.random() - 0.5);
    const picked = Array.from({ length: 12 }, (_, index) => shuffled[index % shuffled.length]);
    cols.forEach((col) => { col.textContent = ''; });
    cols.forEach((col, colIndex) => {
      const track = document.createElement('div');
      track.className = 'material-track';
      const colItems = picked.filter((_name, index) => index % cols.length === colIndex);
      [...colItems, ...colItems].forEach((name) => {
        const img = document.createElement('img');
        img.src = window.projectDetailAssetUrl(`组件库素材/${name}`);
        img.alt = '';
        img.loading = 'lazy';
        track.appendChild(img);
      });
      col.appendChild(track);
    });
  };
  window.flowNodeTimer = null;
  window.setPillarFlowNode = function(index) {
    const wall = document.querySelector('.pillar-flow-wall');
    if (!wall) return;
    const steps = Array.from(wall.querySelectorAll('.flow-step'));
    if (!steps.length) return;
    const nextIndex = (index + steps.length) % steps.length;
    const previousIndex = parseInt(wall.dataset.flowIndex || '-1', 10);
    const activeIndexes = Array.from({ length: Math.min(3, steps.length) }, (_item, offset) => (nextIndex - offset + steps.length) % steps.length);
    steps.forEach((step) => {
      step.classList.remove('is-current', 'is-exiting', 'is-active-0', 'is-active-1', 'is-active-2');
    });
    if (previousIndex >= 0 && previousIndex !== nextIndex) {
      const exitingIndex = (nextIndex - 3 + steps.length) % steps.length;
      if (steps[exitingIndex]) {
        steps[exitingIndex].classList.add('is-exiting');
        window.clearTimeout(steps[exitingIndex]._flowExitTimer);
        steps[exitingIndex]._flowExitTimer = window.setTimeout(() => {
          steps[exitingIndex].classList.remove('is-exiting');
        }, 760);
      }
    }
    activeIndexes.forEach((stepIndex, position) => {
      steps[stepIndex].classList.add(`is-active-${position}`);
      if (position === 0) steps[stepIndex].classList.add('is-current');
    });
    wall.dataset.flowIndex = String(nextIndex);
  };
  window.startPillarFlowLoop = function() {
    const wall = document.querySelector('.pillar-flow-wall');
    if (!wall) return;
    window.clearInterval(window.flowNodeTimer);
    wall.classList.add('is-running');
    wall.dataset.flowIndex = '-1';
    window.setPillarFlowNode(0);
    if (window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion()) return;
    window.flowNodeTimer = window.setInterval(() => {
      const current = parseInt(wall.dataset.flowIndex || '0', 10) || 0;
      window.setPillarFlowNode(current + 1);
    }, 2000);
  };
  window.stopPillarFlowLoop = function() {
    window.clearInterval(window.flowNodeTimer);
    window.flowNodeTimer = null;
    const wall = document.querySelector('.pillar-flow-wall');
    if (!wall) return;
    wall.classList.remove('is-running');
    wall.querySelectorAll('.flow-step').forEach((step) => {
      step.classList.remove('is-current', 'is-exiting', 'is-active-0', 'is-active-1', 'is-active-2');
    });
  };
  window.researchQuotes = [
    '在缺乏DTC基因或技术较弱的传统企业中，网页常被视为一次性的“数字名片”而非持续生长的业务引擎。',
    '需求分析往往沦为管理层的内部博弈而非关注真实用户。',
    '产品设计重静态视觉而轻交互体验。',
    '研发编码高度依赖外包，极易留下代码黑盒与系统对接难题。',
    '由于缺乏明确的转化路径，数据收集多停留在浏览量等虚荣指标。',
    '受限于僵化的预算与组织架构，项目通常“上线即结束”，极难推进基于数据的迭代优化，导致整个建设流程变成缺乏敏捷纠错能力的一锤子买卖。'
  ];
  window.startResearchQuoteLoop = function() {
    const quotes = Array.from(document.querySelectorAll('#c5 .quote, .m-research-intro .m-research-quote'));
    if (!quotes.length || !window.researchQuotes.length) return;
    let index = parseInt(quotes[0].dataset.quoteIndex || '0', 10) || 0;
    const animateQuoteChange = (quote, nextIndex) => {
      window.clearTimeout(quote._researchQuoteOutTimer);
      window.clearTimeout(quote._researchQuoteInTimer);
      quote.classList.remove('is-entering', 'is-switching');
      quote.classList.add('is-leaving');
      quote._researchQuoteOutTimer = window.setTimeout(() => {
        quote.dataset.quoteIndex = String(nextIndex);
        quote.textContent = window.researchQuotes[nextIndex];
        quote.classList.remove('is-leaving');
        quote.classList.add('is-entering');
        quote._researchQuoteInTimer = window.setTimeout(() => {
          quote.classList.remove('is-entering');
        }, 480);
      }, 220);
    };
    quotes.forEach((quote) => {
      quote.dataset.quoteIndex = String(index);
      quote.textContent = window.researchQuotes[index];
      quote.classList.remove('is-leaving', 'is-entering', 'is-switching');
    });
    window.clearInterval(window.researchQuoteTimer);
    if (window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion()) return;
    window.researchQuoteTimer = window.setInterval(() => {
      index = (index + 1) % window.researchQuotes.length;
      quotes.forEach((quote) => {
        animateQuoteChange(quote, index);
      });
    }, 3200);
  };
  window.setPillarTab = function(tabButton) {
    const group = tabButton && tabButton.closest ? tabButton.closest('.pillar-label') : null;
    if (!group) return;
    const card = group.closest('.c-pillars');
    const tabs = Array.from(group.querySelectorAll('.pillar-tab'));
    const selectedIndex = Math.max(0, tabs.indexOf(tabButton));
    const previousIndex = card ? card.dataset.pillarIndex : '';
    if (card) card.dataset.pillarIndex = String(selectedIndex);
    if (selectedIndex === 0 && previousIndex !== '0' && window.randomizeUgcWall) window.randomizeUgcWall();
    if (selectedIndex === 1 && previousIndex !== '1' && window.randomizeComponentWall) window.randomizeComponentWall();
    if (selectedIndex === 2 && previousIndex !== '2' && window.startPillarFlowLoop) window.startPillarFlowLoop();
    if (selectedIndex !== 2 && window.stopPillarFlowLoop) window.stopPillarFlowLoop();
    group.querySelectorAll('.pillar-tab').forEach((item) => {
      const active = item === tabButton;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const copy = group.querySelector('.pillar-copy');
    if (copy) copy.textContent = tabButton.dataset.copy || '';
    if (copy && window.applyCjkLineProtection) window.applyCjkLineProtection(copy);
  };
  window.switchPillarTab = function(control, step) {
    const card = control && control.closest ? control.closest('.c-pillars') : document.getElementById('c2');
    if (!card) return;
    const tabs = Array.from(card.querySelectorAll('.pillar-tab'));
    if (!tabs.length) return;
    const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.classList.contains('is-active')));
    const nextIndex = (activeIndex + step + tabs.length) % tabs.length;
    window.setPillarTab(tabs[nextIndex]);
  };
  window.timelineSlides = [
    {
      title: '用户路径\n工作流沉淀\n团队搭建',
      date: '2025.07.08',
      name: '探索与诊断期',
      image: '电脑端素材/用户路径 工作流沉淀 团队搭建.webp',
      copy: '完成数据埋点基建与 A/B 测试框架搭建，现有工作流沉淀；\n确定初步用户旅程路径及核心页面优化方案；\n完成项目团队搭建。'
    },
    {
      title: '用户访谈\n核心页设计\n数据监控',
      date: '2025.10.08',
      name: '深度优化期',
      image: '电脑端素材/用户访谈 核心页设计 数据监控.webp',
      copy: '启动全球官网用户研究并输出首批用户画像；\n完成首批核心页面（如首页、产品页）的改版上线；\n建立日常数据监控体系。'
    },
    {
      title: '项目总结\n资产盘点\n迭代机制',
      date: '2025.11.08',
      name: '持续优化期',
      image: '电脑端素材/项目总结 资产盘点 迭代机制.webp',
      copy: '完成项目成果总结与复盘；\n输出完整的设计知识库与经验沉淀文档；\n确立长效的持续优化流程机制。'
    }
  ];
  window.setTimelineSlide = function(card, index) {
    const root = card && card.closest ? card.closest('.c-timeline') : document.getElementById('c4');
    if (!root || !window.timelineSlides.length) return;
    const nextIndex = (index + window.timelineSlides.length) % window.timelineSlides.length;
    const currentIndex = parseInt(root.dataset.timelineIndex || '0', 10) || 0;
    if (nextIndex === currentIndex || root._timelineAnimating) return;
    const slide = window.timelineSlides[nextIndex];
    const phase = root.querySelector('.phase');
    const title = root.querySelector('.phase-title');
    const date = root.querySelector('.phase-date');
    const name = root.querySelector('.phase-name');
    const copy = root.querySelector('.phase-copy');
    root._timelineAnimating = true;
    const applySlide = () => {
      if (title) title.textContent = slide.title;
      if (date) date.textContent = slide.date;
      if (name) name.textContent = slide.name;
      if (copy) {
        const rendered = window.renderJourneyCopy
          ? window.renderJourneyCopy(slide.copy)
          : { bodyHtml: slide.copy, resultHtml: '' };
        copy.innerHTML = rendered.bodyHtml + rendered.resultHtml;
      }
      root.dataset.timelineIndex = String(nextIndex);
      root.dataset.bgIndex = String(nextIndex);
      if (phase) {
        phase.classList.remove('is-leaving');
        phase.classList.add('is-entering');
        window.clearTimeout(phase._timelineEnterTimer);
        phase._timelineEnterTimer = window.setTimeout(() => {
          phase.classList.remove('is-entering');
          root._timelineAnimating = false;
        }, 420);
      }
    };
    if (!phase) {
      applySlide();
      root._timelineAnimating = false;
      return;
    }
    window.clearTimeout(phase._timelineLeaveTimer);
    window.clearTimeout(phase._timelineEnterTimer);
    phase.classList.remove('is-entering');
    phase.classList.add('is-leaving');
    phase._timelineLeaveTimer = window.setTimeout(applySlide, 150);
  };
  window.switchTimelineSlide = function(control, step) {
    const root = control && control.closest ? control.closest('.c-timeline') : document.getElementById('c4');
    if (!root) return;
    const currentIndex = parseInt(root.dataset.timelineIndex || '0', 10) || 0;
    window.setTimelineSlide(root, currentIndex + step);
  };
  window.triggerTimelineSlide = function(control, step) {
    const now = Date.now();
    if (control._timelineTriggerAt && now - control._timelineTriggerAt < 80) return;
    control._timelineTriggerAt = now;
    window.switchTimelineSlide(control, step);
  };
  window.personaSlides = [
    {
      title: '决策型\n目标买家',
      lede: '重度依赖移动端碎片化时间进行快速浏览，购买动机往往由即将到来的运动赛事驱动，目的性极强。',
      name: '赛事备战与快速决策用户',
      chips: ['设备: 移动端为主', '决策周期: Within 1 day'],
      quotes: [
        '在 3 次点击内找到特定型号 - 反感拥挤的移动端导航',
        '顺畅调用 Klarna 或信用卡完成无缝支付 - 对支付网关报错极度缺乏耐心。'
      ]
    },
    {
      title: '认知型\n评估探索者',
      lede: '习惯在大屏幕下多开网页仔细研读规格表；对产品的佩戴细节、漏音情况等真实体验反馈极为关注。',
      name: '日常运动与办公评估人群',
      chips: ['设备: PC / 平板端偏好', '决策周期: 2 weeks +'],
      quotes: [
        '“我对漏音程度和具体参数很在意，需要反复横向对比。”',
        '目标与动机：通过场景与参数筛选缩窄产品范围；期望获得直观的图文参数对比。痛点：技术名词晦涩、动图加载慢、对比工具跳出。'
      ]
    },
    {
      title: '深度支持\n特殊诉求者',
      lede: '需要借助系统级辅助工具浏览页面；在产生售后或退换货需求时，迫切需要清晰、直接的指引。',
      name: '辅助浏览与售后支持诉求人群',
      chips: ['设备: 平板 / Screen Reader 插件', '触点: 官网客服 / Reddit 社区'],
      quotes: [
        '“联系表单全是机器人的废话，退货流程让我原地打转。”',
        '目标与动机：页面兼容辅助工具（放大/高对比/Aria 标签）；获取真实人工反馈或一键生成自动退货标签。痛点：字体过小、客服 Bot 问答死循环。'
      ]
    }
  ];
  window.setPersonaSlide = function(card, index) {
    const root = card && card.closest ? card.closest('.c-persona') : document.getElementById('c8');
    if (!root || !window.personaSlides.length) return;
    const nextIndex = (index + window.personaSlides.length) % window.personaSlides.length;
    const currentIndex = parseInt(root.dataset.bgIndex || '0', 10) || 0;
    if (nextIndex === currentIndex || root._personaAnimating) return;
    const slide = window.personaSlides[nextIndex];
    const title = root.querySelector('.title');
    const lede = root.querySelector('.lede');
    const name = root.querySelector('.who .name');
    const chips = root.querySelectorAll('.chip');
    const quotes = root.querySelectorAll('.quotes .q');
    if (!root.dataset.personaDirection) {
      root.dataset.personaDirection = nextIndex > currentIndex ? 'next' : 'prev';
    }
    window.clearTimeout(root._personaLeaveTimer);
    window.clearTimeout(root._personaEnterTimer);
    root._personaAnimating = true;
    root.classList.remove('is-entering');
    root.classList.add('is-leaving');
    root._personaLeaveTimer = window.setTimeout(() => {
      if (title) title.textContent = slide.title;
      if (lede) lede.textContent = slide.lede;
      if (name) name.textContent = slide.name;
      chips.forEach((chip, chipIndex) => {
        chip.textContent = slide.chips[chipIndex] || '';
      });
      quotes.forEach((quote, quoteIndex) => {
        quote.textContent = slide.quotes[quoteIndex] || '';
      });
      root.dataset.bgIndex = String(nextIndex);
      root.querySelectorAll('.switch-count, .m-switch-count').forEach((node) => {
        node.textContent = `${String(nextIndex + 1).padStart(2, '0')} / ${String(window.personaSlides.length).padStart(2, '0')}`;
      });
      root.classList.remove('is-leaving');
      void root.offsetWidth;
      root.classList.add('is-entering');
      root._personaEnterTimer = window.setTimeout(() => {
        root.classList.remove('is-entering');
        root._personaAnimating = false;
      }, 620);
    }, 210);
  };
  window.switchPersonaSlide = function(control, step) {
    const root = control && control.closest ? control.closest('.c-persona') : document.getElementById('c8');
    if (!root) return;
    const currentIndex = parseInt(root.dataset.bgIndex || '0', 10) || 0;
    root.dataset.personaDirection = step >= 0 ? 'next' : 'prev';
    window.setPersonaSlide(root, currentIndex + step);
  };
  window.triggerPersonaSlide = function(control, step) {
    const now = Date.now();
    if (control._personaTriggerAt && now - control._personaTriggerAt < 80) return;
    control._personaTriggerAt = now;
    window.switchPersonaSlide(control, step);
  };



  (function () {
    const canvases = Array.from(document.querySelectorAll('[data-glacier-wave]'));
    if (!canvases.length) return;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uScroll;
      uniform float uRandomSeed;
      uniform float uGtmStyle;
      varying vec2 vUv;

      mat2 rotate2d(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      }

      vec3 permute(vec3 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
      }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float getHeight(vec2 uv, float time, float scroll, float seed) {
        float gtm = step(0.5, uGtmStyle);
        vec2 seedOffset = vec2(seed * 10.3, seed * 4.2);
        vec2 baseUV = uv + seedOffset + vec2(0.0, scroll * 0.2);
        float flowTime = time * mix(0.8, 0.9, gtm) + scroll * 0.5;
        vec2 rotUV = rotate2d(-0.5) * baseUV;
        vec2 distortion = vec2(0.0);
        distortion.x = snoise(rotUV * 0.5 + vec2(flowTime * 0.15, flowTime * 0.1));
        distortion.y = snoise(rotUV * 0.5 - vec2(flowTime * 0.1, flowTime * 0.1));
        float detail = snoise(rotUV * mix(0.975, 1.125, gtm) + distortion + flowTime * 0.1) * mix(0.065, 0.075, gtm);
        float wave = sin(rotUV.y * mix(0.6, 5.0, gtm) + distortion.x * mix(1.7, 3.1, gtm) + flowTime);
        return pow(wave * 0.5 + 0.5, 0.8) + detail;
      }

      void main() {
        vec2 uv = vUv;
        uv.x *= uResolution.x / max(uResolution.y, 1.0);

        float time = uTime * 0.254;
        float h = getHeight(uv, time, uScroll, uRandomSeed);
        float eps = 0.01;
        float hx1 = getHeight(uv + vec2(eps, 0.0), time, uScroll, uRandomSeed);
        float hx2 = getHeight(uv - vec2(eps, 0.0), time, uScroll, uRandomSeed);
        float hy1 = getHeight(uv + vec2(0.0, eps), time, uScroll, uRandomSeed);
        float hy2 = getHeight(uv - vec2(0.0, eps), time, uScroll, uRandomSeed);

        vec3 normal = normalize(vec3(hx2 - hx1, hy2 - hy1, 0.03));
        float light = dot(normal, normalize(vec3(-0.6, 0.5, 0.4))) * 0.5 + 0.5;
        float gtm = step(0.5, uGtmStyle);

        vec3 colAmbient = mix(vec3(0.7922, 0.3412, 1.0), vec3(1.0), gtm);
        vec3 colDeep = mix(vec3(0.0784, 0.4627, 1.0), vec3(1.0), gtm);
        vec3 colMid = mix(vec3(1.0, 0.5020, 0.5020), vec3(0.8667, 0.8118, 0.7333), gtm);
        vec3 colSoft = vec3(1.0);
        vec3 colHigh = mix(vec3(1.0), vec3(0.7294, 0.6863, 0.6118), gtm);
        vec3 colSpec = vec3(1.0);
        vec3 color = mix(colAmbient, colDeep, smoothstep(0.0, 0.591, light));
        color = mix(color, colMid, 1.0 - smoothstep(0.06, 0.591, light));
        color = mix(color, colSoft, smoothstep(0.06, 1.001, light));
        color = mix(color, colHigh, smoothstep(1.0, 1.001, light));
        color = mix(color, colSpec, smoothstep(1.0, 1.001, light));
        float heatFlow1 = snoise((uv / mix(6.0, 3.9, gtm)) * 3.0 + vec2(time * 0.08, -time * 0.03)) * 0.5 + 0.5;
        float heatFlow2 = snoise((uv / mix(1.2, 6.0, gtm)) * 3.0 - vec2(time * 0.05, time * 0.06) + vec2(12.47)) * 0.5 + 0.5;
        float heatBand1 = smoothstep(0.50, 0.59, light) * (1.0 - smoothstep(0.59, 0.70, light));
        float heatBand2 = smoothstep(0.02, 0.06, light) * (1.0 - smoothstep(0.06, 0.14, light));
        vec3 heatHalo = mix(vec3(0.0, 0.8980, 0.6588), vec3(1.0, 0.5843, 0.0), gtm) * heatBand1 * smoothstep(0.05, 1.0, heatFlow1) * mix(0.77, 0.98, gtm);
        heatHalo += mix(vec3(1.0, 0.5059, 0.2392), vec3(1.0, 0.6353, 0.0), gtm) * heatBand2 * smoothstep(0.71, 1.0, heatFlow2) * mix(1.5, 0.97, gtm);
        color = 1.0 - (1.0 - color) * (1.0 - clamp(heatHalo, 0.0, 1.0));
        color = clamp((color - 0.5) * mix(1.5, 1.25, gtm) + mix(0.35, 0.45, gtm), 0.0, 1.0);

        float p = clamp(uScroll, 0.0, 1.0);
        float easedScroll = 1.0 - pow(1.0 - p, 2.0);
        float wavePos = easedScroll * 2.8 - 0.2;
        float waveOffset = h * 0.4 + sin(uv.x * 4.0 + time) * 0.05;
        float dist = wavePos - (vUv.y + waveOffset);
        float whiteMask = smoothstep(0.0, 0.15, dist);
        float waveCrest = smoothstep(-0.05, 0.1, dist) * smoothstep(0.2, 0.05, dist);

        vec3 finalColor = mix(color, vec3(1.0), whiteMask);
        finalColor += vec3(0.98, 0.99, 1.0) * waveCrest * 0.6;
        finalColor += (light - 0.5) * 0.03 * whiteMask;
        gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
      }
    `;

    const instances = canvases.map((canvas) => {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uScroll: { value: 0 },
        uRandomSeed: { value: Math.random() * 100 },
        uGtmStyle: { value: canvas.classList.contains('glacier-wave-bg--gtm') ? 1 : 0 }
      };
      const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

      return {
        canvas,
        section: canvas.closest('.card, .m-media') || canvas.parentElement,
        renderer,
        scene,
        camera,
        uniforms
      };
    });

    function resizeInstance(instance) {
      const rect = instance.canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const size = instance.renderer.getSize(new THREE.Vector2());
      if (size.x !== width || size.y !== height) {
        instance.renderer.setSize(width, height, false);
        instance.uniforms.uResolution.value.set(width, height);
      }
    }

    /* 仅渲染当前在视口内的波浪背景，离屏时暂停以省 GPU / 电量（外观不变）。
       注意：同一张卡可能有多个波浪 canvas（如 c6 有 3 个），需按 section 归组追踪全部实例。 */
    instances.forEach((instance) => { instance._onScreen = true; });
    if ('IntersectionObserver' in window) {
      const sectionInstances = new Map();
      instances.forEach((instance) => {
        if (!instance.section) return;
        if (!sectionInstances.has(instance.section)) sectionInstances.set(instance.section, []);
        sectionInstances.get(instance.section).push(instance);
      });
      if (sectionInstances.size) {
        instances.forEach((instance) => { if (instance.section) instance._onScreen = false; });
        const visibilityObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const list = sectionInstances.get(entry.target) || [];
            list.forEach((instance) => { instance._onScreen = entry.isIntersecting; });
          });
        }, { rootMargin: '160px 0px' });
        sectionInstances.forEach((_list, section) => visibilityObserver.observe(section));
      }
    }

    if (window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion()) {
      instances.forEach((instance) => {
        resizeInstance(instance);
        instance.uniforms.uScroll.value = 0;
        instance.uniforms.uTime.value = 0;
        instance.renderer.render(instance.scene, instance.camera);
      });
      window.addEventListener('resize', () => instances.forEach(resizeInstance), { passive: true });
      return;
    }

    function animate(time) {
      requestAnimationFrame(animate);
      if (document.hidden) return;
      instances.forEach((instance) => {
        if (!instance._onScreen) return;
        resizeInstance(instance);
        instance.uniforms.uScroll.value = 0;
        instance.uniforms.uTime.value = time * 0.0025;
        instance.renderer.render(instance.scene, instance.camera);
      });
    }

    requestAnimationFrame(animate);
    window.addEventListener('resize', () => instances.forEach(resizeInstance), { passive: true });
  })();



  (function initOutroWave() {
    const canvas = document.getElementById('outroWaveCanvas');
    const pane = document.getElementById('outroNext');
    if (!canvas || !pane) return;
    if (typeof THREE === 'undefined') {
      if (canvas.dataset.outroWaveReady) return;
      canvas.dataset.outroWaveReady = 'true';

      const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
      if (!gl) return;

      const rawVertexShader = `
        attribute vec2 aPosition;
        varying vec2 vUv;
        void main() {
          vUv = aPosition * 0.5 + 0.5;
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `;
      const rawFragmentShader = `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uProgress;
        uniform float uRandomSeed;
        uniform float uMobileVertical;
        varying vec2 vUv;

        mat2 rotate2d(float angle) { return mat2(cos(angle), -sin(angle), sin(angle), cos(angle)); }
        vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        float getHeight(vec2 uv, float time, float progress, float seed) {
          vec2 seedOffset = vec2(seed * 10.3, seed * 4.2);
          vec2 baseUV = uv + seedOffset + vec2(progress * 0.2, 0.0);
          float flowTime = time * 0.9 + progress * 0.5;
          vec2 rotUV = rotate2d(-0.5) * baseUV;
          vec2 distortion = vec2(0.0);
          distortion.x = snoise(rotUV * 0.5 + vec2(flowTime * 0.15, flowTime * 0.1));
          distortion.y = snoise(rotUV * 0.5 - vec2(flowTime * 0.1, flowTime * 0.1));
          float detail = snoise(rotUV * 1.125 + distortion + flowTime * 0.1) * 0.075;
          float wave = sin(rotUV.y * 5.0 + distortion.x * 3.1 + flowTime);
          return pow(wave * 0.5 + 0.5, 0.8) + detail;
        }
        void main() {
          vec2 uv = vUv;
          uv.x *= uResolution.x / max(uResolution.y, 1.0);
          float time = uTime * 0.254;
          float h = getHeight(uv, time, uProgress, uRandomSeed);
          float eps = 0.01;
          float hx1 = getHeight(uv + vec2(eps, 0.0), time, uProgress, uRandomSeed);
          float hx2 = getHeight(uv - vec2(eps, 0.0), time, uProgress, uRandomSeed);
          float hy1 = getHeight(uv + vec2(0.0, eps), time, uProgress, uRandomSeed);
          float hy2 = getHeight(uv - vec2(0.0, eps), time, uProgress, uRandomSeed);
          vec3 normal = normalize(vec3(hx2 - hx1, hy2 - hy1, 0.03));
          float light = dot(normal, normalize(vec3(-0.6, 0.5, 0.4))) * 0.5 + 0.5;
          vec3 colAmbient = vec3(1.0);
          vec3 colDeep = vec3(1.0);
          vec3 colMid = vec3(0.8667, 0.8118, 0.7333);
          vec3 colSoft = vec3(1.0);
          vec3 colHigh = vec3(0.7294, 0.6863, 0.6118);
          vec3 colSpec = vec3(1.0);
          vec3 color = mix(colAmbient, colDeep, smoothstep(0.0, 0.001, light));
          color = mix(color, colMid, smoothstep(0.0, 1.001, light));
          color = mix(color, colSoft, 1.0 - smoothstep(0.24, 1.0, light));
          color = mix(color, colHigh, smoothstep(0.24, 0.591, light));
          color = mix(color, colSpec, smoothstep(0.59, 1.001, light));
          float glowFlow1 = snoise((uv / 3.9) * 3.0 + vec2(time * 0.08, -time * 0.03)) * 0.5 + 0.5;
          float glowFlow2 = snoise((uv / 6.0) * 3.0 - vec2(time * 0.05, time * 0.06) + vec2(12.47)) * 0.5 + 0.5;
          float glowBand1 = 1.0 - smoothstep(0.0, 0.58, light);
          float glowBand2 = 1.0 - smoothstep(0.0, 0.78, light);
          vec3 glowHalo = vec3(1.0, 0.5843, 0.0) * glowBand1 * smoothstep(0.23, 1.0, glowFlow1) * 0.98;
          glowHalo += vec3(1.0, 0.6353, 0.0) * glowBand2 * smoothstep(0.60, 1.0, glowFlow2) * 0.97;
          color = 1.0 - (1.0 - color) * (1.0 - clamp(glowHalo, 0.0, 1.0));
          color = clamp((color - 0.5) * 1.25 + 0.45, 0.0, 1.0);
          float p = clamp(uProgress, 0.0, 1.0);
          float easedProgress = 1.0 - pow(1.0 - p, 2.0);
          float wavePos = mix(1.2, 0.08, easedProgress);
          float axisCoord = mix(vUv.x, 1.0 - vUv.y, uMobileVertical);
          float crossCoord = mix(vUv.y, vUv.x, uMobileVertical);
          float waveOffset = h * 0.4 + sin(crossCoord * 4.0 + time) * 0.05;
          float dist = axisCoord - (wavePos + waveOffset);
          float coloredWave = smoothstep(0.0, 0.15, dist);
          float whiteMask = 1.0 - coloredWave;
          float waveCrest = smoothstep(-0.05, 0.1, dist) * smoothstep(0.2, 0.05, dist);
          vec3 waveColor = color + vec3(0.98, 0.99, 1.0) * waveCrest * 0.6;
          waveColor += (light - 0.5) * 0.03 * coloredWave;
          vec3 finalColor = mix(vec3(1.0), waveColor, coloredWave);
          gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
        }
      `;

      function compile(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile failed');
        }
        return shader;
      }

      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, rawVertexShader));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, rawFragmentShader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const positionLocation = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const uniforms = {
        time: gl.getUniformLocation(program, 'uTime'),
        resolution: gl.getUniformLocation(program, 'uResolution'),
        progress: gl.getUniformLocation(program, 'uProgress'),
        seed: gl.getUniformLocation(program, 'uRandomSeed'),
        mobileVertical: gl.getUniformLocation(program, 'uMobileVertical')
      };
      gl.uniform1f(uniforms.seed, 42.0);
      gl.uniform1f(uniforms.mobileVertical, window.matchMedia('(max-width: 767px)').matches ? 1.0 : 0.0);

      let targetProgress = 0;
      let currentProgress = 0;
      window.__setOutroWaveProgress = (progress) => {
        targetProgress = Math.max(0, Math.min(1, progress || 0));
      };

      function resizeRaw() {
        const rect = pane.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = Math.max(1, Math.round(rect.width * ratio));
        const height = Math.max(1, Math.round(rect.height * ratio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
          gl.uniform2f(uniforms.resolution, width, height);
        }
        gl.uniform1f(uniforms.mobileVertical, window.matchMedia('(max-width: 767px)').matches ? 1.0 : 0.0);
      }

      if (window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion()) {
        resizeRaw();
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uniforms.progress, 0);
        gl.uniform1f(uniforms.time, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        window.addEventListener('resize', resizeRaw, { passive: true });
        return;
      }

      function animateRaw(time) {
        requestAnimationFrame(animateRaw);
        if (document.hidden) return;
        /* outro 波浪只在过渡进行/收尾时渲染，离屏静止时跳过（外观不变） */
        if (targetProgress <= 0.0005 && currentProgress <= 0.0005) {
          currentProgress = targetProgress;
          return;
        }
        resizeRaw();
        currentProgress += (targetProgress - currentProgress) * 0.12;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uniforms.progress, currentProgress);
        gl.uniform1f(uniforms.time, time * 0.0025);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      window.addEventListener('resize', resizeRaw, { passive: true });
      requestAnimationFrame(animateRaw);
      return;
    }

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uProgress;
      uniform float uRandomSeed;
      uniform float uMobileVertical;
      varying vec2 vUv;

      mat2 rotate2d(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      }

      vec3 permute(vec3 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
      }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float getHeight(vec2 uv, float time, float progress, float seed) {
        vec2 seedOffset = vec2(seed * 10.3, seed * 4.2);
        vec2 baseUV = uv + seedOffset + vec2(progress * 0.2, 0.0);
        float flowTime = time * 0.9 + progress * 0.5;
        vec2 rotUV = rotate2d(-0.5) * baseUV;
        vec2 distortion = vec2(0.0);
        distortion.x = snoise(rotUV * 0.5 + vec2(flowTime * 0.15, flowTime * 0.1));
        distortion.y = snoise(rotUV * 0.5 - vec2(flowTime * 0.1, flowTime * 0.1));
        float detail = snoise(rotUV * 1.125 + distortion + flowTime * 0.1) * 0.075;
        float wave = sin(rotUV.y * 5.0 + distortion.x * 3.1 + flowTime);
        return pow(wave * 0.5 + 0.5, 0.8) + detail;
      }

      void main() {
        vec2 uv = vUv;
        uv.x *= uResolution.x / max(uResolution.y, 1.0);

        float time = uTime * 0.254;
        float h = getHeight(uv, time, uProgress, uRandomSeed);
        float eps = 0.01;
        float hx1 = getHeight(uv + vec2(eps, 0.0), time, uProgress, uRandomSeed);
        float hx2 = getHeight(uv - vec2(eps, 0.0), time, uProgress, uRandomSeed);
        float hy1 = getHeight(uv + vec2(0.0, eps), time, uProgress, uRandomSeed);
        float hy2 = getHeight(uv - vec2(0.0, eps), time, uProgress, uRandomSeed);
        vec3 normal = normalize(vec3(hx2 - hx1, hy2 - hy1, 0.03));
        float light = dot(normal, normalize(vec3(-0.6, 0.5, 0.4))) * 0.5 + 0.5;

        vec3 colAmbient = vec3(1.0);
        vec3 colDeep = vec3(1.0);
        vec3 colMid = vec3(0.8667, 0.8118, 0.7333);
        vec3 colSoft = vec3(1.0);
        vec3 colHigh = vec3(0.7294, 0.6863, 0.6118);
        vec3 colSpec = vec3(1.0);
        vec3 color = mix(colAmbient, colDeep, smoothstep(0.0, 0.001, light));
        color = mix(color, colMid, smoothstep(0.0, 1.001, light));
        color = mix(color, colSoft, 1.0 - smoothstep(0.24, 1.0, light));
        color = mix(color, colHigh, smoothstep(0.24, 0.591, light));
        color = mix(color, colSpec, smoothstep(0.59, 1.001, light));
        float glowFlow1 = snoise((uv / 3.9) * 3.0 + vec2(time * 0.08, -time * 0.03)) * 0.5 + 0.5;
        float glowFlow2 = snoise((uv / 6.0) * 3.0 - vec2(time * 0.05, time * 0.06) + vec2(12.47)) * 0.5 + 0.5;
        float glowBand1 = 1.0 - smoothstep(0.0, 0.58, light);
        float glowBand2 = 1.0 - smoothstep(0.0, 0.78, light);
        vec3 glowHalo = vec3(1.0, 0.5843, 0.0) * glowBand1 * smoothstep(0.23, 1.0, glowFlow1) * 0.98;
        glowHalo += vec3(1.0, 0.6353, 0.0) * glowBand2 * smoothstep(0.60, 1.0, glowFlow2) * 0.97;
        color = 1.0 - (1.0 - color) * (1.0 - clamp(glowHalo, 0.0, 1.0));
        color = clamp((color - 0.5) * 1.25 + 0.45, 0.0, 1.0);

        float p = clamp(uProgress, 0.0, 1.0);
        float easedProgress = 1.0 - pow(1.0 - p, 2.0);
        float wavePos = mix(1.2, 0.08, easedProgress);
        float axisCoord = mix(vUv.x, 1.0 - vUv.y, uMobileVertical);
        float crossCoord = mix(vUv.y, vUv.x, uMobileVertical);
        float waveOffset = h * 0.4 + sin(crossCoord * 4.0 + time) * 0.05;
        float dist = axisCoord - (wavePos + waveOffset);
        float coloredWave = smoothstep(0.0, 0.15, dist);
        float whiteMask = 1.0 - coloredWave;
        float waveCrest = smoothstep(-0.05, 0.1, dist) * smoothstep(0.2, 0.05, dist);

        vec3 waveColor = color + vec3(0.98, 0.99, 1.0) * waveCrest * 0.6;
        waveColor += (light - 0.5) * 0.03 * coloredWave;
        vec3 finalColor = mix(vec3(1.0), waveColor, coloredWave);
        gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
      }
    `;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uProgress: { value: 0 },
      uRandomSeed: { value: 42.0 },
      uMobileVertical: { value: window.matchMedia('(max-width: 767px)').matches ? 1 : 0 }
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    function resize() {
      const rect = pane.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const size = renderer.getSize(new THREE.Vector2());
      if (size.x !== width || size.y !== height) {
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width, height);
      }
      uniforms.uMobileVertical.value = window.matchMedia('(max-width: 767px)').matches ? 1 : 0;
    }

    let targetProgress = 0;
    let currentProgress = 0;
    window.__setOutroWaveProgress = (progress) => {
      targetProgress = Math.max(0, Math.min(1, progress || 0));
    };

    if (window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion()) {
      resize();
      uniforms.uProgress.value = 0;
      uniforms.uTime.value = 0;
      renderer.render(scene, camera);
      window.addEventListener('resize', resize, { passive: true });
      return;
    }

    function animate(time) {
      requestAnimationFrame(animate);
      if (document.hidden) return;
      /* outro 波浪只在过渡进行/收尾时渲染，离屏静止时跳过（外观不变） */
      if (targetProgress <= 0.0005 && currentProgress <= 0.0005) {
        currentProgress = targetProgress;
        return;
      }
      resize();
      currentProgress += (targetProgress - currentProgress) * 0.12;
      uniforms.uProgress.value = currentProgress;
      uniforms.uTime.value = time * 0.0025;
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(animate);
  })();



  (function () {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    if (window.randomizeUgcWall) window.randomizeUgcWall();
    if (window.randomizeComponentWall) window.randomizeComponentWall();
    if (window.startResearchQuoteLoop) window.startResearchQuoteLoop();

    function isMobile() {
      return mobileQuery.matches;
    }

    /* ── JS 动态精确包裹层高度 ── */
    function fit() {
      const w = window.innerWidth;
      const canvas = document.querySelector('.canvas');
      const wrap = document.querySelector('.canvas-wrap');
      const mobile = isMobile();
      const scale = mobile ? 1 : w / 1920; 
      
      document.documentElement.style.setProperty('--scale', scale);
      if (mobile) {
        if (wrap) wrap.style.height = 'auto';
        return;
      }
      
      requestAnimationFrame(() => {
        if (canvas && wrap) {
          wrap.style.height = `${canvas.getBoundingClientRect().height}px`;
          updateScrollEffects();
        }
      });
    }
    
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('load', fit);

    /* ── Accordion + scroll sync ── */
    const items = document.querySelectorAll('.acc-item');
    const cards = document.querySelectorAll('.card');

    function openItem(item, scroll) {
      items.forEach((it) => {
        const open = it === item;
        it.classList.toggle('is-open', open);
        const trigger = it.querySelector('.acc-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      if (scroll) {
        const tid = item.dataset.target;
        const target = tid ? document.getElementById(tid) : null;
        if (target) {
          const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1;
          const rect = target.getBoundingClientRect();
          const y = window.scrollY + rect.top - (isMobile() ? 16 : 60 * scale);
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
    items.forEach((item) => {
      const trigger = item.querySelector('.acc-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', () => openItem(item, true));
    });

    const targets = new Map();
    items.forEach((it) => {
      const id = it.dataset.target;
      if (id) {
        const el = document.getElementById(id);
        if (el) targets.set(el, it);
      }
    });
    let pendingItem = null, rafId = null;
    function applyPending() {
      rafId = null;
      if (pendingItem && !pendingItem.classList.contains('is-open')) openItem(pendingItem, false);
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const item = targets.get(e.target);
          if (item) {
            pendingItem = item;
            if (!rafId) rafId = requestAnimationFrame(applyPending);
          }
        }
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    targets.forEach((_item, el) => io.observe(el));

    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); reveal.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    cards.forEach((c) => reveal.observe(c));

    function setBgIndex(target, step) {
      const count = parseInt(target.dataset.bgCount || '1', 10);
      if (!Number.isFinite(count) || count <= 1) return;
      const current = parseInt(target.dataset.bgIndex || '0', 10) || 0;
      const next = (current + step + count) % count;
      target.dataset.bgIndex = String(next);
      const label = `${String(next + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
      target.querySelectorAll('.switch-count, .m-switch-count').forEach((node) => {
        node.textContent = label;
      });
      if (target.id === 'c8' && window.setPersonaSlide) {
        window.setPersonaSlide(target, next);
      }
      if (target.id === 'c9' && window.setJourneySlide) {
        window.setJourneySlide(next);
      }
      if (target.id === 'c11') {
        const mock = target.querySelector('.final-mock');
        if (mock) {
          target.classList.add('is-switching');
          mock._finalPanY = 0;
          mock.style.setProperty('--final-pan-y', '0px');
          mock.classList.remove('is-panned');
          window.clearTimeout(target._finalSwitchTimer);
          target._finalSwitchTimer = window.setTimeout(() => {
            target.classList.remove('is-switching');
          }, 260);
        }
      }
    }

    document.querySelectorAll('[data-bg-count]').forEach((target) => setBgIndex(target, 0));
    document.querySelectorAll('[data-bg-step]').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const target = btn.closest('[data-bg-count]');
        if (!target) return;
        const step = parseInt(btn.dataset.bgStep || '0', 10) || 0;
        setBgIndex(target, step);
      });
    });

    function setFinalImage(step) {
      const target = document.getElementById('c11');
      if (!target) return;
      const shots = Array.from(target.querySelectorAll('.final-shot'));
      const count = shots.length || parseInt(target.dataset.bgCount || '1', 10);
      if (!Number.isFinite(count) || count <= 1) return;
      const current = parseInt(target.dataset.bgIndex || '0', 10) || 0;
      const next = (current + step + count) % count;
      target.dataset.bgIndex = String(next);
      target.querySelectorAll('.switch-count, .m-switch-count').forEach((node) => {
        node.textContent = `${String(next + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
      });
      const mock = target.querySelector('.final-mock');
      if (mock) {
        target.classList.add('is-switching');
        mock._finalPanY = 0;
        mock._finalBoundaryLock = false;
        mock.style.setProperty('--final-pan-y', '0px');
        mock.classList.remove('is-panned');
        window.clearTimeout(target._finalSwitchTimer);
        target._finalSwitchTimer = window.setTimeout(() => {
          target.classList.remove('is-switching');
        }, 260);
      }
    }
    window.setFinalImage = setFinalImage;

    function switchFinalAtBoundary(mock, step) {
      if (!mock || mock._finalBoundaryLock) return;
      mock._finalBoundaryLock = true;
      setFinalImage(step);
      window.setTimeout(() => {
        mock._finalBoundaryLock = false;
      }, 420);
    }

    const journeySlides = [
      {
        title: '认知与入站',
        images: ['旅程素材/认知与入站1.webp', '旅程素材/认知与入站2.webp'],
        copy: `用户通过 Google 搜索品牌词进入，快速扫视首屏，试图寻找官方背书与核心科技解释。期望立刻了解品牌核心价值、官方购物保障（DTC优势）。
"Technical language feel foreign." - Olfa Fdhila

强化品牌背书与 DTC 利益点
Hero区展示品牌力，新增通俗易懂的 2年质保、免邮等竞争力保障展示。

科技降维解释与构建社会认同
合并科技与痛点展示并采用易懂文案。引入明星推荐与真实 Reviews，增加独立对比页跳转。

数据成果：
首页 CTA 点击率 CTR +24.3%：首页核心转化显著提升，验证“品牌背书 + DTC利益点 + 社会认同”的首屏模型有效，并已推动北美及国际首页同口径优化排期。`
      },
      {
        title: '浏览与定位',
        images: ['旅程素材/浏览与定位1.webp'],
        copy: `用户在移动端展开导航菜单寻找运动场景分类；在集合页尝试使用筛选条件过滤产品。
期望手机端一级菜单直接展示；在集合页能通过筛选排序工具快速过滤产品。
"Confusing navigation, Slightly too busy." - Jonathan Tabois

手机端与场景化分类导航
导航栏产品根据“运动场景”分类，手机端一级菜单立刻展示分类，直达目标。

多维过滤矩阵：场景 + 参数 + 排序
顶部前置场景筛选。侧边栏增加技术/价格等高级筛选和排序(Sort by)功能。

数据成果：
移动端导航路径 1 层直达：移动端一级菜单直接暴露运动场景，集合页筛选从“被动查找”转为“场景 + 参数 + 排序”的主动过滤模型。`
      },
      {
        title: '评估与对比',
        images: ['旅程素材/评估与对比1.webp', '旅程素材/评估与对比2.webp'],
        copy: `用户仔细阅读产品规格，在多开标签页中横向比对型号(如防水等级、漏音情况)。
期望页面加载顺畅，无需跳出即可浏览Specs/Reviews。希望对比参数有图示辅助，并能看到真实使用场景。
"Way too many flashy pictures and GIFs prevent scrolling..." - Georgina
"Product Comparison Page: Some timeshard to decipher." - Gary Hanson

性能优化与动画瘦身
删除沉重的序列帧动画，改用“文字+视频/图片”。解决厚重动图拖慢加载的问题。

Key Features 前置与 A+ 实拍
首屏下方直接接入网格化 Key Features。补充“Standard vs Mini”上头实拍视频对比。

参数规范化与图示辅助
数字参数统一单位；难懂参数（充电口、防水）使用 Icon 辅助说明。

数据成果：
对比页转化率 CVR +1.3pp / 对比页加购率 ATR +4.2pp：对比页商业表现突破，验证“参数规范化 + 图示辅助 + 性能瘦身”的组合有效，并固化为后续页面优化模板。
页面核心渲染时间目标 <2s：用轻量视频/图片替代冗余动效，降低加载阻力。`
      },
      {
        title: '转化与加购',
        images: ['旅程素材/转化与加购.webp'],
        copy: `用户查看产品形态与佩戴效果，选择颜色/尺寸加入购物车，并尝试调用Klarna完成支付。期望购买页能有3D/视频看清佩戴细节；冗长文字可以折叠；对难懂词汇(充电口)有解释；顺畅的抽屉式结账。
"I was looking for something quite specificabout levels of sound leakage..." - Georgina
"The shopping cart went round in circles a few times." - Gary Hanson

多维视觉预览 (3D/视频) 与难点弹窗
增加 3D 模型与人物场景图。针对“充电口”等难懂内容，增加弹窗(Tooltip)解释。

卖点文字折叠与防呆 SKU
长文字描述设为可折叠；使用单选组并增加未选红框验证提示，防止跳出报错。

官网 Benefit 硬植入与大促氛围
按钮下方硬核露出“2年质保/免邮”信任清单。醒目展示营销 Banner 和赠品信息。

无缝侧边抽屉交互 (Slide-out)
加购后拉出侧边抽屉购物车，保留原始页面上下文，避免全屏跳转打断选购流。

复杂赠品逻辑折叠
赠品降级为所属主商品的从属 UI 列表（缩进）。支持一键移除主商品自动清理附属赠品的逻辑。

数据成果：
页面测试问题数量 -82% / 设计交付周期 -36%：组件化设计显著降低返工和沟通成本，成为跨部门优秀案例，并引出代码组件库战略项目。`
      }
    ];
    window.journeySlides = journeySlides;

    const journeyHeadings = new Set([
      '强化品牌背书与 DTC 利益点',
      '强化品牌背书与DTC利益点',
      '科技降维解释与构建社会认同',
      '手机端与场景化分类导航',
      '多维过滤矩阵：场景 + 参数 + 排序',
      '性能优化与动画瘦身',
      'Key Features 前置与 A+ 实拍',
      '参数规范化与图示辅助',
      '多维视觉预览 (3D/视频) 与难点弹窗',
      '卖点文字折叠与防呆 SKU',
      '官网 Benefit 硬植入与大促氛围',
      '无缝侧边抽屉交互 (Slide-out)',
      '复杂赠品逻辑折叠'
    ]);

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    const cjkNoBreakTerms = [
      'Shokz（韶音）',
      'Specs/Reviews',
      'Key Features',
      'Standard vs Mini',
      'Sort by',
      'Slide-out',
      'A/B',
      'A+',
      'DTC',
      'BFCM',
      'Shopify',
      'Google',
      'Klarna',
      'CTA',
      'CTR',
      'CVR',
      'ATR',
      'SKU',
      'UI',
      'UX',
      '3D',
      'Hero区',
      'Benefit',
      'Reviews',
      'Tooltip',
      '+24.3%',
      '+4.2pp',
      '+1.3pp',
      '-82%',
      '-36%',
      '<2s',
      '60+',
      '2年质保'
    ].sort((a, b) => b.length - a.length);

    function escapeRegExp(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function protectCjkInlineText(value) {
      const text = String(value);
      const ranges = [];
      const addRange = (start, end) => {
        if (start < end) ranges.push({ start, end });
      };
      cjkNoBreakTerms.forEach((term) => {
        const pattern = new RegExp(escapeRegExp(term), 'g');
        let match;
        while ((match = pattern.exec(text))) addRange(match.index, match.index + match[0].length);
      });
      const tokenPattern = /(<\s*\d+(?:\.\d+)?s|[+-]?\d+(?:\.\d+)?\s*(?:pp|%|s|m)|\d+\+|[A-Z][A-Z0-9]*(?:[+/.:-][A-Z0-9]+)+|[A-Z]{2,}|[A-Za-z]+\/[A-Za-z]+|[A-Za-z]+(?:-[A-Za-z]+)+)/g;
      let match;
      while ((match = tokenPattern.exec(text))) addRange(match.index, match.index + match[0].length);
      const merged = ranges
        .sort((a, b) => a.start - b.start || b.end - a.end)
        .reduce((items, range) => {
          const last = items[items.length - 1];
          if (last && range.start <= last.end) {
            last.end = Math.max(last.end, range.end);
          } else {
            items.push({ ...range });
          }
          return items;
        }, []);
      if (!merged.length) return escapeHtml(text);
      let cursor = 0;
      let html = '';
      merged.forEach((range) => {
        html += escapeHtml(text.slice(cursor, range.start));
        html += `<span class="fd-cjk-nb">${escapeHtml(text.slice(range.start, range.end))}</span>`;
        cursor = range.end;
      });
      html += escapeHtml(text.slice(cursor));
      return html;
    }

    function applyCjkLineProtection(root = document) {
      const scope = root.nodeType === Node.ELEMENT_NODE ? root : document;
      const selectors = [
        '.acc-body',
        '.pillar-copy',
        '.friction-copy',
        '.phase-copy',
        '.c-research .quote',
        '.org-left-top .org-sub',
        '.org-left-bottom .org-list',
        '.org-team-copy',
        '.c-persona .lede',
        '.c-persona .quotes .q',
        '.journey-copy-line',
        '.journey-result-copy',
        '#c10 .c-libs-label .s',
        '.m-brief__text',
        '.m-card-label__sub',
        '.m-timeline__phase-text',
        '.m-workflow-list',
        '.m-persona-lede',
        '.m-quote-stack',
        '.m-journey-copy',
        '.m-journey-quote'
      ];
      const targets = scope.matches && selectors.some((selector) => scope.matches(selector))
        ? [scope]
        : Array.from(scope.querySelectorAll(selectors.join(',')));
      targets.forEach((target) => {
        const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            if (node.parentElement && node.parentElement.closest('.fd-cjk-nb, script, style')) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach((node) => {
          const protectedHtml = protectCjkInlineText(node.nodeValue);
          if (protectedHtml === escapeHtml(node.nodeValue)) return;
          const template = document.createElement('template');
          template.innerHTML = protectedHtml;
          node.replaceWith(template.content);
        });
      });
    }

    window.applyCjkLineProtection = applyCjkLineProtection;

    function renderJourneyCopy(copy) {
      const parts = String(copy).split(/\n数据成果：\n?/);
      const body = parts[0] || '';
      const result = (parts[1] || '').trim();
      const bodyHtml = body.split('\n').map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '<div class="journey-copy-gap"></div>';
        const cls = journeyHeadings.has(trimmed) ? 'journey-head blend-difference' : 'journey-copy-line';
        return `<div class="${cls}">${protectCjkInlineText(trimmed)}</div>`;
      }).join('');
      return { bodyHtml, resultHtml: renderJourneyResult(result) };
    }

    window.renderJourneyCopy = renderJourneyCopy;

    function renderJourneyResult(result) {
      if (!result) return '';
      const lines = result.split('\n').map((line) => line.trim()).filter(Boolean);
      const metricPairs = [];
      const copyLines = [];
      lines.forEach((line) => {
        const splitIndex = line.indexOf('：');
        if (splitIndex === -1) {
          copyLines.push(line);
          return;
        }
        const metricText = line.slice(0, splitIndex).trim();
        const copyText = line.slice(splitIndex + 1).trim();
        const chunks = metricText.split(/\s*\/\s*/).map((item) => item.trim()).filter(Boolean);
        chunks.forEach((chunk) => {
          const match = chunk.match(/^(.+?)\s*([+-]?\d+(?:\.\d+)?(?:pp|%|s)?|<\s*\d+(?:\.\d+)?s|1\s*层直达)$/i);
          if (match) {
            metricPairs.push({ label: match[1].trim(), value: match[2].replace(/\s+/g, '') });
          } else {
            metricPairs.push({ label: '关键指标', value: chunk });
          }
        });
        if (copyText) copyLines.push(copyText);
      });
      const metricsHtml = metricPairs.length
        ? `<div class="journey-metrics">${metricPairs.map((item) => `
          <div class="journey-metric">
            <div class="journey-metric-value">${protectCjkInlineText(item.value)}</div>
            <div class="journey-metric-label">${protectCjkInlineText(item.label)}</div>
          </div>`).join('')}</div>`
        : '';
      const copyHtml = copyLines.length
        ? `<div class="journey-result-copy">${protectCjkInlineText(copyLines.join('\n'))}</div>`
        : '';
      return metricsHtml + copyHtml;
    }

    function applyJourneyShotDesignSize(img) {
      if (!img || !img.naturalWidth || !img.naturalHeight) return;
      img.style.width = `${img.naturalWidth / 2}px`;
      img.style.height = `${img.naturalHeight / 2}px`;
    }

    function setJourneyShotImage(shot, index) {
      const images = JSON.parse(shot.dataset.images || '[]');
      const img = shot.querySelector('.journey-shot-img');
      if (!images.length || !img) return;
      const next = ((index % images.length) + images.length) % images.length;
      const nextSrc = images[next];
      if (img.getAttribute('src') === nextSrc) return;
      shot.dataset.imageIndex = String(next);
      window.clearTimeout(shot._journeyShotSwapTimer);
      let swapped = false;
      const swapImage = () => {
        if (swapped) return;
        swapped = true;
        const reveal = () => {
          applyJourneyShotDesignSize(img);
          window.requestAnimationFrame(() => img.classList.remove('is-changing'));
        };
        img.addEventListener('load', reveal, { once: true });
        img.src = nextSrc;
        if (img.complete) reveal();
      };
      const preloader = new Image();
      preloader.onload = () => {
        img.classList.add('is-changing');
        shot._journeyShotSwapTimer = window.setTimeout(swapImage, 220);
      };
      preloader.onerror = swapImage;
      preloader.src = nextSrc;
    }

    function renderJourneyShot(root, slide) {
      const shot = root.querySelector('.journey-shot');
      if (!shot) return;
      const images = Array.isArray(slide.images) ? slide.images : [];
      window.clearInterval(root._journeyShotTimer);
      root._journeyShotTimer = null;
      window.clearTimeout(shot._journeyShotSwapTimer);
      shot.classList.toggle('is-empty', !images.length);
      if (!images.length) {
        shot.innerHTML = '';
        return;
      }
      const imageHtml = `<img class="journey-shot-img is-active" src="${escapeHtml(window.projectDetailAssetUrl(images[0]))}" alt="" loading="lazy">`;
      shot.dataset.imageIndex = '0';
      shot.dataset.images = JSON.stringify(images);
      shot.innerHTML = imageHtml;
      const img = shot.querySelector('.journey-shot-img');
      if (img) {
        img.addEventListener('load', () => applyJourneyShotDesignSize(img));
        if (img.complete) applyJourneyShotDesignSize(img);
      }
      if (images.length > 1 && !(window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion())) {
        root._journeyShotTimer = window.setInterval(() => {
          const current = parseInt(shot.dataset.imageIndex || '0', 10) || 0;
          setJourneyShotImage(shot, current + 1);
        }, 2800);
      }
    }

    window.setJourneySlide = function(index) {
      const root = document.getElementById('c9');
      if (!root) return;
      const count = journeySlides.length;
      const next = ((index % count) + count) % count;
      const slide = journeySlides[next];
      root.dataset.bgIndex = String(next);
      root.dataset.bgCount = String(count);
      root.querySelectorAll('.switch-count, .m-switch-count').forEach((node) => {
        node.textContent = `${String(next + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
      });
      root.querySelectorAll('.step').forEach((step, stepIndex) => {
        const active = stepIndex === next;
        step.classList.toggle('active', active);
        step.setAttribute('aria-current', active ? 'true' : 'false');
      });
      const body = root.querySelector('.body-text');
      const result = root.querySelector('.journey-result');
      if (body) {
        const applySlide = () => {
          const rendered = renderJourneyCopy(slide.copy);
          body.innerHTML = rendered.bodyHtml;
          if (result) {
            result.innerHTML = rendered.resultHtml;
            result.style.display = rendered.resultHtml ? 'block' : 'none';
          }
          applyCjkLineProtection(body);
          if (result) applyCjkLineProtection(result);
          renderJourneyShot(root, slide);
        };
        root.classList.add('is-switching');
        window.clearTimeout(root._journeySwitchTimer);
        root._journeySwitchTimer = window.setTimeout(() => {
          applySlide();
          root.classList.remove('is-switching');
        }, 160);
        if (!root._journeyInitialized) {
          window.clearTimeout(root._journeySwitchTimer);
          applySlide();
          root.classList.remove('is-switching');
          root._journeyInitialized = true;
        }
      }
    };

    document.querySelectorAll('#c9 .step').forEach((step) => {
      step.addEventListener('click', () => {
        const index = parseInt(step.dataset.journeyIndex || '0', 10) || 0;
        window.setJourneySlide(index);
      });
    });
    window.setJourneySlide(0);

    document.querySelectorAll('.pillar-tab').forEach((tabButton) => {
      tabButton.addEventListener('click', () => {
        const group = tabButton.closest('.pillar-label');
        if (!group) return;
        group.querySelectorAll('.pillar-tab').forEach((item) => {
          const active = item === tabButton;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        const copy = group.querySelector('.pillar-copy');
        if (copy) copy.textContent = tabButton.dataset.copy || '';
        if (copy && window.applyCjkLineProtection) window.applyCjkLineProtection(copy);
      });
    });

    applyCjkLineProtection(document);

    /* ── 滑动引擎核心，完全剥离纵向 JS 干预，只处理平滑横移 ── */
    const outro = document.querySelector('.outro');
    const nextPane = document.getElementById('outroNext');
    const canvasWrap = document.querySelector('.canvas-wrap');
    const mobilePage = document.querySelector('.mobile-393');
    const fill = document.getElementById('outroFill');
    const ugcWall = document.querySelector('.pillar-ugc-wall');
    const componentWall = document.querySelector('.pillar-component-wall');
    
    const smoothstep = (t) => t * t * (3 - 2 * t);

    function updateScrollEffects() {
      if (!outro || !nextPane || !canvasWrap) return;

      if (isMobile()) {
        canvasWrap.style.transform = '';
        nextPane.style.transform = '';
        const rOutroMobile = outro.getBoundingClientRect();
        const mobileRaw = Math.max(0, Math.min(1, (window.innerHeight - rOutroMobile.top) / Math.max(1, window.innerHeight * 0.72)));
        const mobileWaveProgress = smoothstep(mobileRaw);
        if (mobilePage) {
          mobilePage.style.opacity = String(Math.max(0, 1 - mobileWaveProgress));
          mobilePage.style.pointerEvents = mobileWaveProgress > 0.92 ? 'none' : '';
        }
        if (ugcWall) {
          ugcWall.style.setProperty('--ugc-shift-1', '0px');
          ugcWall.style.setProperty('--ugc-shift-2', '0px');
          ugcWall.style.setProperty('--ugc-shift-3', '0px');
        }
        if (componentWall) {
          componentWall.style.setProperty('--component-shift-1', '0px');
          componentWall.style.setProperty('--component-shift-2', '0px');
          componentWall.style.setProperty('--component-shift-3', '0px');
          componentWall.style.setProperty('--component-x-1', '0px');
          componentWall.style.setProperty('--component-x-2', '0px');
          componentWall.style.setProperty('--component-x-3', '0px');
        }
        if (fill) fill.style.width = '0';
        nextPane.style.setProperty('--outro-wave-mask-start', '120vw');
        nextPane.style.setProperty('--outro-wave-mask-low', '120vw');
        nextPane.style.setProperty('--outro-wave-mask-mid', '120vw');
        nextPane.style.setProperty('--outro-wave-mask-soft', '120vw');
        nextPane.style.setProperty('--outro-white-wave-x', '-360px');
        if (window.__setOutroWaveProgress) window.__setOutroWaveProgress(mobileWaveProgress);
        return;
      }

      if (mobilePage) {
        mobilePage.style.opacity = '';
        mobilePage.style.pointerEvents = '';
      }
      
      const rOutro = outro.getBoundingClientRect();
      const outroTop = window.scrollY + rOutro.top;
      const pageEnd = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const total = Math.max(1, pageEnd - outroTop);
      
      const raw = Math.max(0, Math.min(1, (window.scrollY - outroTop) / total));
      const p = smoothstep(raw);

      const vw = window.innerWidth;
      
      const tx = Math.round(-p * vw); 
      const nx = Math.round((1 - p) * vw); 
      
      canvasWrap.style.transform = `translate3d(${tx}px, 0, 0)`;
      nextPane.style.transform   = `translate3d(${nx}px, 0, 0)`;
      const finalWaveLeft = vw * 0.3;
      const waveEdge = finalWaveLeft + (1 - p) * (vw - finalWaveLeft + 260);
      nextPane.style.setProperty('--outro-wave-mask-start', `${waveEdge - 120}px`);
      nextPane.style.setProperty('--outro-wave-mask-low', `${waveEdge}px`);
      nextPane.style.setProperty('--outro-wave-mask-mid', `${waveEdge + 170}px`);
      nextPane.style.setProperty('--outro-wave-mask-soft', `${waveEdge + 360}px`);
      nextPane.style.setProperty('--outro-white-wave-x', `${waveEdge}px`);
      if (window.__setOutroWaveProgress) window.__setOutroWaveProgress(p);
      
      if (fill) fill.style.width = `${raw * 100}%`;

      if (ugcWall) {
        const card = ugcWall.closest('#c2');
        if (card) {
          const rect = card.getBoundingClientRect();
          const travel = window.innerHeight + rect.height;
          const rawUgc = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / travel));
          const drift = (smoothstep(rawUgc) - 0.5) * 2;
          ugcWall.style.setProperty('--ugc-shift-1', `${Math.round(drift * -34)}px`);
          ugcWall.style.setProperty('--ugc-shift-2', `${Math.round(drift * 46)}px`);
          ugcWall.style.setProperty('--ugc-shift-3', `${Math.round(drift * -26)}px`);
        }
      }

      if (componentWall) {
        const card = componentWall.closest('#c2');
        if (card) {
          const rect = card.getBoundingClientRect();
          const travel = window.innerHeight + rect.height;
          const rawComponent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / travel));
          const drift = (smoothstep(rawComponent) - 0.5) * 2;
          componentWall.style.setProperty('--component-shift-1', `${Math.round(drift * 24)}px`);
          componentWall.style.setProperty('--component-shift-2', `${Math.round(drift * -38)}px`);
          componentWall.style.setProperty('--component-shift-3', `${Math.round(drift * 18)}px`);
          componentWall.style.setProperty('--component-x-1', `${Math.round(drift * -10)}px`);
          componentWall.style.setProperty('--component-x-2', `${Math.round(drift * 14)}px`);
          componentWall.style.setProperty('--component-x-3', `${Math.round(drift * -6)}px`);
        }
      }
    }
    updateScrollEffects();

    let scrollRafPending = false;
    function onScrollEffects() {
      if (scrollRafPending) return;
      scrollRafPending = true;
      requestAnimationFrame(() => {
        scrollRafPending = false;
        updateScrollEffects();
      });
    }
    window.addEventListener('scroll', onScrollEffects, { passive: true });
    window.addEventListener('resize', updateScrollEffects);
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', () => {
        fit();
        updateScrollEffects();
      });
    }

  })();



  (function () {
    const finalCard = document.getElementById('c11');
    if (!finalCard) return;
    const FINAL_STACK_GAP = 120;
    const FINAL_SCROLL_FACTOR = 0.72;
    const FINAL_SCROLL_EASE = 0.18;
    const FINAL_SCROLL_EPSILON = 0.45;

    function getFinalMock() {
      return finalCard.querySelector('.final-mock');
    }

    function getFinalShots() {
      return Array.from(finalCard.querySelectorAll('.final-shot'));
    }

    function getFinalShotHeight(shot, mock) {
      const measured = shot.offsetHeight || shot.getBoundingClientRect().height;
      if (measured) return measured;
      if (shot.naturalWidth && shot.naturalHeight) {
        return mock.clientWidth * (shot.naturalHeight / shot.naturalWidth);
      }
      return mock.clientHeight;
    }

    function setFinalCounter(index) {
      const count = getFinalShots().length || 1;
      finalCard.querySelectorAll('.switch-count, .m-switch-count').forEach((node) => {
        node.textContent = `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
      });
    }

    function buildFinalStack(mock) {
      if (!mock) return;
      let top = 0;
      const shots = getFinalShots();
      shots.forEach((shot) => {
        shot._finalStackTop = top;
        top += getFinalShotHeight(shot, mock) + FINAL_STACK_GAP;
      });
      mock._finalStackHeight = Math.max(mock.clientHeight, top - FINAL_STACK_GAP);
    }

    function getFinalMaxOffset(mock) {
      buildFinalStack(mock);
      return Math.max(0, Math.round((mock._finalStackHeight || mock.clientHeight) - mock.clientHeight));
    }

    function getNearestFinalIndex(mock, offset) {
      const shots = getFinalShots();
      let nearestIndex = 0;
      let nearestDistance = Infinity;
      shots.forEach((shot, index) => {
        const distance = Math.abs((shot._finalStackTop || 0) - offset);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });
      return nearestIndex;
    }

    function renderFinalStack(mock, rebuild = true) {
      if (!mock) return;
      if (rebuild) buildFinalStack(mock);
      const shots = getFinalShots();
      const offset = Number.isFinite(mock._finalStackOffset) ? mock._finalStackOffset : 0;
      shots.forEach((shot) => {
        const y = (shot._finalStackTop || 0) - offset;
        shot.style.setProperty('--final-shot-y', `${y.toFixed(1)}px`);
      });
      const activeIndex = getNearestFinalIndex(mock, offset);
      finalCard.dataset.bgIndex = String(activeIndex);
      setFinalCounter(activeIndex);
      const isPanned = offset > 2;
      mock.classList.toggle('is-panned', isPanned);
    }

    function animateFinalStack(mock) {
      if (!mock) return;
      const current = Number.isFinite(mock._finalStackOffset) ? mock._finalStackOffset : 0;
      const target = Number.isFinite(mock._finalStackTargetOffset) ? mock._finalStackTargetOffset : current;
      const distance = target - current;
      if (Math.abs(distance) <= FINAL_SCROLL_EPSILON) {
        mock._finalStackOffset = target;
        mock._finalStackRaf = null;
        renderFinalStack(mock, false);
        finalCard.classList.remove('is-final-scrolling');
        return;
      }
      mock._finalStackOffset = current + distance * FINAL_SCROLL_EASE;
      renderFinalStack(mock, false);
      mock._finalStackRaf = window.requestAnimationFrame(() => animateFinalStack(mock));
    }

    function setFinalTargetOffset(mock, target, immediate = false) {
      if (!mock) return;
      const maxOffset = getFinalMaxOffset(mock);
      const next = Math.max(0, Math.min(maxOffset, target));
      mock._finalStackTargetOffset = next;
      if (immediate) {
        if (mock._finalStackRaf) {
          window.cancelAnimationFrame(mock._finalStackRaf);
          mock._finalStackRaf = null;
        }
        mock._finalStackOffset = next;
        renderFinalStack(mock, false);
        finalCard.classList.remove('is-final-scrolling');
        return;
      }
      if (Math.abs((Number.isFinite(mock._finalStackOffset) ? mock._finalStackOffset : 0) - next) > FINAL_SCROLL_EPSILON) {
        finalCard.classList.add('is-final-scrolling');
      }
      if (!mock._finalStackRaf) {
        mock._finalStackRaf = window.requestAnimationFrame(() => animateFinalStack(mock));
      }
    }

    function scrollFinalStack(delta) {
      const mock = getFinalMock();
      if (!mock) return;
      const currentTarget = Number.isFinite(mock._finalStackTargetOffset)
        ? mock._finalStackTargetOffset
        : (Number.isFinite(mock._finalStackOffset) ? mock._finalStackOffset : 0);
      setFinalTargetOffset(mock, currentTarget + delta);
    }

    function setFinalImage(step) {
      const mock = getFinalMock();
      if (!mock) return false;
      buildFinalStack(mock);
      const shots = getFinalShots();
      if (shots.length <= 1) return false;
      const currentOffset = Number.isFinite(mock._finalStackTargetOffset) ? mock._finalStackTargetOffset : (mock._finalStackOffset || 0);
      const currentIndex = getNearestFinalIndex(mock, currentOffset);
      const nextIndex = (currentIndex + step + shots.length) % shots.length;
      finalCard.classList.add('is-stack-switching');
      window.clearTimeout(finalCard._finalStackSwitchTimer);
      setFinalTargetOffset(mock, shots[nextIndex]._finalStackTop || 0);
      finalCard._finalStackSwitchTimer = window.setTimeout(() => {
        finalCard.classList.remove('is-stack-switching');
      }, 760);
      return true;
    }

    window.setFinalImage = setFinalImage;

    document.addEventListener('click', (event) => {
      const btn = event.target && event.target.closest ? event.target.closest('#c11 [data-final-step]') : null;
      if (!btn) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const step = parseInt(btn.dataset.finalStep || '0', 10) || 0;
      setFinalImage(step);
    }, true);

    document.addEventListener('wheel', (event) => {
      const mock = getFinalMock();
      if (!mock) return;
      const rect = mock.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      scrollFinalStack(event.deltaY * FINAL_SCROLL_FACTOR);
    }, { passive: false, capture: true });

    const mock = getFinalMock();
    if (mock) {
      setFinalTargetOffset(mock, 0, true);
      getFinalShots().forEach((shot) => {
        shot.addEventListener('load', () => setFinalTargetOffset(mock, mock._finalStackTargetOffset || 0, true), { once: false });
      });
      mock.addEventListener('touchstart', (event) => {
        mock._finalTouchY = event.touches && event.touches[0] ? event.touches[0].clientY : 0;
      }, { passive: true });
      mock.addEventListener('touchmove', (event) => {
        const touch = event.touches && event.touches[0];
        if (!touch) return;
        const lastY = Number.isFinite(mock._finalTouchY) ? mock._finalTouchY : touch.clientY;
        const delta = touch.clientY - lastY;
        mock._finalTouchY = touch.clientY;
        if (Math.abs(delta) < 1) return;
        event.preventDefault();
        scrollFinalStack(-delta);
      }, { passive: false });
      window.addEventListener('resize', () => setFinalTargetOffset(mock, mock._finalStackTargetOffset || 0, true));
    }
  })();



  (function initMobileExperience() {
    const mobileRoot = document.querySelector('.mobile-393');
    if (!mobileRoot) return;

    const isMobile = () => window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    const applyTextProtection = (root) => {
      if (window.applyCjkLineProtection && root) window.applyCjkLineProtection(root);
    };
    const counterText = (index, count) => `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
    const updateMobileStatus = (root, label, index, count) => {
      const text = `${label}，第 ${index + 1} 项，共 ${count} 项`;
      if (window.fdProjectSetStatusText) window.fdProjectSetStatusText(root, text);
    };

    function syncMobileProjectHeader() {
      const desktopHeader = document.querySelector('.canvas-wrap .header') || document.querySelector('.header');
      if (!desktopHeader) return;
      const desktopTitle = desktopHeader.querySelector('.h-title');
      const mobileTitle = mobileRoot.querySelector('[data-sync-project-title]');
      if (desktopTitle && mobileTitle) {
        mobileTitle.textContent = desktopTitle.textContent
          .replace(/\r/g, '')
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .join('\n');
      }
      const desktopStats = Array.from(desktopHeader.querySelectorAll('.h-stat'));
      const mobileStats = Array.from(mobileRoot.querySelectorAll('.m-head .m-stat'));
      desktopStats.forEach((stat, index) => {
        const target = mobileStats[index];
        if (!target) return;
        const label = stat.querySelector('.label');
        const value = stat.querySelector('.value');
        const targetLabel = target.querySelector('.m-stat__label');
        const targetValue = target.querySelector('.m-stat__value');
        if (label && targetLabel) targetLabel.textContent = label.textContent.trim();
        if (value && targetValue) targetValue.textContent = value.textContent.trim();
      });
    }

    function syncMobileHero() {
      const desktopHero = document.getElementById('c1');
      const mobileHero = mobileRoot.querySelector('.m-hero-media');
      if (!desktopHero || !mobileHero) return;
      const desktopCaption = desktopHero.querySelector('.c-hero-caption');
      const mobileCaption = mobileHero.querySelector('.m-hero-caption');
      if (desktopCaption && mobileCaption) mobileCaption.textContent = desktopCaption.textContent.trim();
      const desktopStats = Array.from(desktopHero.querySelectorAll('.stat-l'));
      const mobileStats = Array.from(mobileHero.querySelectorAll('.m-hero-stat'));
      desktopStats.forEach((stat, index) => {
        const target = mobileStats[index];
        if (!target) return;
        const value = stat.querySelector('.v');
        const label = stat.querySelector('.l');
        const targetValue = target.querySelector('.m-hero-stat__value');
        const targetLabel = target.querySelector('.m-hero-stat__label');
        if (value && targetValue) targetValue.textContent = value.textContent.trim();
        if (label && targetLabel) targetLabel.textContent = label.textContent.trim();
      });
    }

    function syncMobileFriction(index = 0) {
      const desktopRoot = document.getElementById('c3');
      const mobileRootEl = mobileRoot.querySelector('#m-mobile-challenges');
      if (!desktopRoot || !mobileRootEl) return;
      const items = Array.from(desktopRoot.querySelectorAll('.friction-item'));
      if (!items.length) return;
      const next = ((index % items.length) + items.length) % items.length;
      const intro = desktopRoot.querySelector('.friction-intro');
      const mobileIntro = mobileRootEl.querySelector('.m-friction-intro');
      const mobileList = mobileRootEl.querySelector('.m-friction-list');
      const count = mobileRootEl.querySelector('.m-switch-count');
      mobileRootEl.dataset.bgIndex = String(next);
      mobileRootEl.dataset.bgCount = String(items.length);
      if (mobileIntro && intro) mobileIntro.textContent = intro.textContent.trim();
      if (mobileList) {
        window.clearTimeout(mobileList._frictionSwitchTimer);
        mobileList.classList.remove('is-switching');
        void mobileList.offsetWidth;
        mobileList.classList.add('is-switching');
        mobileList.textContent = '';
        mobileList.setAttribute('aria-live', 'polite');
        items.forEach((item, itemIndex) => {
          const title = item.querySelector('.friction-title');
          const copy = item.querySelector('.friction-copy');
          const mobileItem = document.createElement('div');
          mobileItem.className = 'm-friction-item';
          mobileItem.classList.toggle('is-active', itemIndex === next);
          const mobileTitle = document.createElement('div');
          mobileTitle.className = 'm-friction-title blend-difference';
          mobileTitle.textContent = title ? title.textContent.trim() : '';
          const mobileCopy = document.createElement('div');
          mobileCopy.className = 'm-friction-copy';
          mobileCopy.textContent = copy ? copy.textContent.trim() : '';
          mobileItem.append(mobileTitle, mobileCopy);
          mobileList.appendChild(mobileItem);
        });
        mobileList._frictionSwitchTimer = window.setTimeout(() => {
          mobileList.classList.remove('is-switching');
        }, 360);
      }
      if (count) count.textContent = counterText(next, items.length);
      updateMobileStatus(mobileRootEl, '系统性挑战', next, items.length);
      applyTextProtection(mobileRootEl);
    }

    function getMobilePillarData() {
      const desktopRoot = document.getElementById('c2');
      if (!desktopRoot) return [];
      return Array.from(desktopRoot.querySelectorAll('.pillar-tab')).map((tab) => ({
        title: tab.textContent.trim(),
        copy: tab.dataset.copy || '',
        tab
      }));
    }

    function renderMobilePillarVisual(root, index) {
      const visual = root.querySelector('.m-mobile-pillar-visual');
      if (!visual) return;
      const visualSources = [
        { selector: '#c2 .pillar-ugc-wall', variant: 'ugc' },
        { selector: '#c2 .pillar-component-wall', variant: 'component' },
        { selector: '#c2 .pillar-flow-wall', variant: 'flow' }
      ];
      const source = document.querySelector((visualSources[index] || visualSources[0]).selector);
      const variant = (visualSources[index] || visualSources[0]).variant;
      visual.textContent = '';
      visual.className = `m-mobile-pillar-visual m-mobile-pillar-visual--${variant}`;
      if (!source) return;
      const clone = source.cloneNode(true);
      clone.classList.add('is-mobile-clone');
      clone.removeAttribute('style');
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
      if (variant === 'component') {
        const images = Array.from(clone.querySelectorAll('img'));
        const wall = document.createElement('div');
        const col = document.createElement('div');
        const track = document.createElement('div');
        wall.className = 'pillar-component-wall is-mobile-clone';
        col.className = 'component-col';
        track.className = 'material-track';
        images.forEach((img) => {
          img.removeAttribute('style');
          img.loading = 'eager';
          img.decoding = 'async';
          track.appendChild(img);
        });
        col.appendChild(track);
        wall.appendChild(col);
        visual.appendChild(wall);
        return;
      }
      if (variant === 'flow') {
        const sourceSteps = Array.from(source.querySelectorAll('.flow-step'));
        clone.querySelectorAll('.flow-step').forEach((step, stepIndex) => {
          const sourceStep = sourceSteps[stepIndex];
          const label = sourceStep
            ? window.getComputedStyle(sourceStep, '::after').content.replace(/^["']|["']$/g, '')
            : '';
          step.dataset.flowIndex = String(stepIndex + 1).padStart(2, '0');
          step.dataset.flowLabel = label && label !== 'none' ? label : '';
        });
      }
      visual.appendChild(clone);
    }

    function renderMobilePillarTabs(root, data, activeIndex) {
      const tabsHost = root.querySelector('.m-mobile-pillar-tabs');
      if (!tabsHost) return;
      tabsHost.textContent = '';
      data.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'm-mobile-pillar-tab';
        button.setAttribute('aria-pressed', index === activeIndex ? 'true' : 'false');
        button.dataset.mobilePillarIndex = String(index);
        button.textContent = item.title;
        const active = index === activeIndex;
        button.classList.toggle('is-active', active);
        button.addEventListener('click', () => setMobilePillar(index));
        tabsHost.appendChild(button);
      });
    }

    function setMobilePillar(index = 0, syncDesktop = true) {
      const root = mobileRoot.querySelector('[data-mobile-pillar]');
      const data = getMobilePillarData();
      if (!root || !data.length) return;
      const next = ((index % data.length) + data.length) % data.length;
      const item = data[next];
      root.dataset.bgIndex = String(next);
      root.dataset.bgCount = String(data.length);
      if (syncDesktop && item.tab && window.setPillarTab) window.setPillarTab(item.tab);
      renderMobilePillarTabs(root, data, next);
      const title = root.querySelector('.m-card-label__title');
      const copy = root.querySelector('.m-card-label__sub');
      if (copy) copy.textContent = item.copy;
      root.querySelectorAll('.m-switch-count').forEach((node) => {
        node.textContent = counterText(next, data.length);
      });
      updateMobileStatus(root, `整体目标：${item.title}`, next, data.length);
      renderMobilePillarVisual(root, next);
      applyTextProtection(root);
    }

    mobileRoot.querySelectorAll('[data-mobile-pillar-step]').forEach((button) => {
      button.addEventListener('click', () => {
        const root = button.closest('[data-mobile-pillar]');
        const current = parseInt(root && root.dataset.bgIndex || '0', 10) || 0;
        const step = parseInt(button.dataset.mobilePillarStep || '0', 10) || 0;
        setMobilePillar(current + step);
      });
    });

    function syncMobileOrg() {
      const desktopRoot = document.getElementById('c6');
      if (!desktopRoot) return;
      const mobileOverview = mobileRoot.querySelector('.m-org-overview');
      const mobileGoals = mobileRoot.querySelector('.m-org-goals');
      const mobileWorkflow = mobileRoot.querySelector('.m-org-workflow');
      const bodyText = desktopRoot.querySelector('.c-org-l .body-text');
      const teamChips = Array.from(desktopRoot.querySelectorAll('.org-team-chip'));
      const desktopGoalsTitle = desktopRoot.querySelector('.org-left-top .org-title');
      const desktopGoalsSub = desktopRoot.querySelector('.org-left-top .org-sub');
      const desktopWorkflowTitle = desktopRoot.querySelector('.org-left-bottom .org-title');
      const desktopWorkflowList = desktopRoot.querySelector('.org-left-bottom .org-list');
      const orgSlides = [
        {
          type: 'goals',
          title: desktopGoalsTitle ? desktopGoalsTitle.textContent.trim() : '',
          copy: desktopGoalsSub ? desktopGoalsSub.textContent.trim() : ''
        },
        {
          type: 'workflow',
          title: desktopWorkflowTitle ? desktopWorkflowTitle.textContent.trim() : '',
          copy: desktopWorkflowList ? desktopWorkflowList.textContent.trim() : ''
        },
        {
          type: 'team',
          nodes: teamChips.map((chip) => chip.textContent.trim()).filter(Boolean),
          copy: bodyText ? bodyText.textContent.trim() : ''
        }
      ];
      function renderMobileOrgSlide(index = 0) {
        if (!mobileOverview || !orgSlides.length) return;
        const next = ((index % orgSlides.length) + orgSlides.length) % orgSlides.length;
        const slide = orgSlides[next];
        const text = mobileOverview.querySelector('.m-org-text');
        const nodes = mobileOverview.querySelector('.m-org-nodes');
        if (!text || !nodes) return;
        mobileOverview.dataset.mobileOrgIndex = String(next);
        mobileOverview.dataset.mobileOrgCount = String(orgSlides.length);
        nodes.textContent = '';
        text.textContent = '';
        text.className = 'm-org-text';
        text.classList.add(`m-org-text--${slide.type}`);
        if (slide.type === 'team') {
          slide.nodes.forEach((label) => {
            const node = document.createElement('span');
            node.className = 'm-org-node';
            node.textContent = label;
            nodes.appendChild(node);
          });
          text.textContent = slide.copy;
        } else {
          const title = document.createElement('div');
          title.className = 'm-org-slide-title';
          title.textContent = slide.title;
          const copy = document.createElement('div');
          copy.className = 'm-org-slide-copy';
          copy.textContent = slide.copy;
          text.append(title, copy);
        }
        let controls = mobileOverview.querySelector('.m-org-carousel-controls');
        if (!controls) {
          controls = document.createElement('div');
          controls.className = 'm-org-carousel-controls';
          controls.innerHTML = [
            '<button class="m-arrow m-arrow--dark" type="button" aria-label="上一个团队内容" data-mobile-org-step="-1"></button>',
            '<button class="m-arrow m-arrow--dark m-arrow--next" type="button" aria-label="下一个团队内容" data-mobile-org-step="1"></button>',
            '<span class="m-state-text" aria-live="polite" aria-atomic="true"></span>'
          ].join('');
          mobileOverview.appendChild(controls);
          controls.querySelectorAll('[data-mobile-org-step]').forEach((button) => {
            button.addEventListener('click', () => {
              const current = parseInt(mobileOverview.dataset.mobileOrgIndex || '0', 10) || 0;
              const step = parseInt(button.dataset.mobileOrgStep || '0', 10) || 0;
              renderMobileOrgSlide(current + step);
            });
          });
        }
        const status = mobileOverview.querySelector('.m-org-carousel-controls .m-state-text');
        if (status) status.textContent = `团队与流程，第 ${next + 1} 项，共 ${orgSlides.length} 项`;
        applyTextProtection(mobileOverview);
      }
      if (mobileOverview) {
        renderMobileOrgSlide(parseInt(mobileOverview.dataset.mobileOrgIndex || '0', 10) || 0);
        if (!mobileOverview._mobileOrgSwipeBound) {
          mobileOverview._mobileOrgSwipeBound = true;
          mobileOverview.addEventListener('touchstart', (event) => {
            mobileOverview._mobileOrgTouchX = event.touches && event.touches[0] ? event.touches[0].clientX : 0;
          }, { passive: true });
          mobileOverview.addEventListener('touchend', (event) => {
            const touch = event.changedTouches && event.changedTouches[0];
            if (!touch || !Number.isFinite(mobileOverview._mobileOrgTouchX)) return;
            const delta = touch.clientX - mobileOverview._mobileOrgTouchX;
            if (Math.abs(delta) < 42) return;
            const current = parseInt(mobileOverview.dataset.mobileOrgIndex || '0', 10) || 0;
            renderMobileOrgSlide(current + (delta < 0 ? 1 : -1));
          }, { passive: true });
        }
      }
      if (mobileGoals) {
        const title = mobileGoals.querySelector('.m-card-label__title');
        const sub = mobileGoals.querySelector('.m-card-label__sub');
        if (title && desktopGoalsTitle) title.textContent = desktopGoalsTitle.textContent.trim();
        if (sub && desktopGoalsSub) sub.textContent = desktopGoalsSub.textContent.trim();
      }
      if (mobileWorkflow) {
        const value = mobileWorkflow.querySelector('.m-workflow-value');
        const title = mobileWorkflow.querySelector('.m-workflow-title');
        const list = mobileWorkflow.querySelector('.m-workflow-list');
        if (value) value.textContent = '';
        if (title && desktopWorkflowTitle) title.textContent = desktopWorkflowTitle.textContent.trim();
        if (list && desktopWorkflowList) list.textContent = desktopWorkflowList.textContent.trim();
      }
      applyTextProtection(mobileGoals);
      applyTextProtection(mobileWorkflow);
    }

    function syncMobileUserResearch() {
      const desktopRoot = document.getElementById('c7');
      const mobileRootEl = mobileRoot.querySelector('.m-user-research');
      if (!desktopRoot || !mobileRootEl) return;
      const desktopLabel = desktopRoot.querySelector('.label');
      const mobileTitle = mobileRootEl.querySelector('.m-user-title');
      if (desktopLabel && mobileTitle) mobileTitle.textContent = desktopLabel.textContent.trim();
      const desktopStats = Array.from(desktopRoot.querySelectorAll('.stat'));
      const mobileStats = Array.from(mobileRootEl.querySelectorAll('.m-user-stats > div'));
      desktopStats.forEach((stat, index) => {
        const target = mobileStats[index];
        if (!target) return;
        const label = stat.querySelector('.l');
        const value = stat.querySelector('.v');
        const targetLabel = target.querySelector('.m-user-stat__label');
        const targetValue = target.querySelector('.m-user-stat__value');
        if (label && targetLabel) targetLabel.textContent = label.textContent.trim();
        if (value && targetValue) targetValue.textContent = value.textContent.trim();
      });
    }

    function syncMobileComponents() {
      const desktopRoot = document.getElementById('c10');
      const mobileRootEl = mobileRoot.querySelector('.m-structure-components');
      if (!desktopRoot || !mobileRootEl) return;
      const desktopTitle = desktopRoot.querySelector('.c-libs-label .t');
      const desktopCopy = desktopRoot.querySelector('.c-libs-label .s');
      const mobileTitle = mobileRootEl.querySelector('.m-card-label__title');
      const mobileCopy = mobileRootEl.querySelector('.m-card-label__sub');
      const mobilePreview = mobileRootEl.querySelector('.m-component-preview');
      if (desktopTitle && mobileTitle) mobileTitle.textContent = desktopTitle.textContent.trim();
      if (desktopCopy && mobileCopy) mobileCopy.textContent = desktopCopy.textContent.trim();
      if (mobilePreview) {
        const desktopTrack = desktopRoot.querySelector('.c-libs-marquee-track');
        if (desktopTrack && !mobilePreview.querySelector('.c-libs-marquee-track')) {
          const clone = desktopTrack.cloneNode(true);
          clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
          mobilePreview.replaceChildren(clone);
        }
        const mobileTrack = mobilePreview.querySelector('.c-libs-marquee-track');
        if (mobileTrack && mobileTrack.children.length === 1) {
          const clone = mobileTrack.children[0].cloneNode(true);
          clone.removeAttribute('id');
          mobileTrack.appendChild(clone);
        }
      }
      applyTextProtection(mobileRootEl);
    }

    function setMobileTimeline(index, direction = 0) {
      const root = mobileRoot.querySelector('.m-timeline');
      const slides = window.timelineSlides || [];
      if (!root || !slides.length) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      const slide = slides[next];
      const title = root.querySelector('.m-timeline__phase-title');
      const text = root.querySelector('.m-timeline__phase-text');
      const img = root.querySelector('.m-img');
      const count = root.querySelector('.m-switch-count');
      const current = parseInt(root.dataset.mobileTimelineIndex || '0', 10) || 0;
      const shouldAnimate = direction && next !== current && !window.fdProjectPrefersReducedMotion();

      const applySlide = () => {
        root.dataset.mobileTimelineIndex = String(next);
        root.dataset.bgIndex = String(next);
        if (title) title.textContent = slide.title;
        if (text) {
          text.innerHTML = `
            <span class="m-timeline__phase-date">${escapeMobileHtml(slide.date)}</span>
            <span class="m-timeline__phase-name">${escapeMobileHtml(slide.name)}</span>
            <span class="m-timeline__phase-copy">${escapeMobileHtml(slide.copy)}</span>
          `;
        }
        if (img && slide.image) {
          img.style.setProperty(
            'background',
            `url("${window.projectDetailAssetUrl(slide.image)}") center / cover no-repeat`,
            'important'
          );
        }
        if (count) count.textContent = counterText(next, slides.length);
        updateMobileStatus(root, `项目阶段：${slide.name}`, next, slides.length);
        applyTextProtection(root);
      };

      window.clearTimeout(root._mobileTimelineLeaveTimer);
      window.clearTimeout(root._mobileTimelineEnterTimer);
      window.clearTimeout(root._mobileTimelineDoneTimer);

      if (!shouldAnimate) {
        root.classList.remove('is-mobile-timeline-leaving', 'is-mobile-timeline-entering');
        root._mobileTimelineAnimating = false;
        applySlide();
        return;
      }

      if (root._mobileTimelineAnimating) return;
      root._mobileTimelineAnimating = true;
      root.dataset.mobileTimelineDirection = direction > 0 ? 'next' : 'prev';
      root.classList.remove('is-mobile-timeline-entering');
      root.classList.add('is-mobile-timeline-leaving');

      root._mobileTimelineLeaveTimer = window.setTimeout(() => {
        applySlide();
        root.classList.remove('is-mobile-timeline-leaving');
        root.classList.add('is-mobile-timeline-entering');
        root._mobileTimelineDoneTimer = window.setTimeout(() => {
          root.classList.remove('is-mobile-timeline-entering');
          root._mobileTimelineAnimating = false;
        }, 430);
      }, 150);
    }

    mobileRoot.querySelectorAll('[data-mobile-timeline-step]').forEach((button) => {
      button.addEventListener('click', () => {
        const root = button.closest('.m-timeline');
        const current = parseInt(root && root.dataset.mobileTimelineIndex || '0', 10) || 0;
        const step = parseInt(button.dataset.mobileTimelineStep || '0', 10) || 0;
        setMobileTimeline(current + step, step);
      });
    });

    function escapeMobileHtml(value) {
      return String(value).replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[ch]);
    }

    function setMobilePersona(index, direction = 0) {
      const root = mobileRoot.querySelector('[data-mobile-persona]');
      const slides = window.personaSlides || [];
      if (!root || !slides.length) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      const slide = slides[next];
      const title = root.querySelector('.m-persona-title');
      const lede = root.querySelector('.m-persona-lede');
      const name = root.querySelector('.m-persona-name');
      const chipRow = root.querySelector('.m-chip-row');
      const quotes = root.querySelector('.m-quote-stack');
      const count = root.querySelector('.m-switch-count');
      const shouldAnimate = direction && !window.fdProjectPrefersReducedMotion();
      const getMobilePersonaName = (value) => String(value || '')
        .replace(/\s*·\s*占盘\s*\d+(?:\.\d+)?%/g, '')
        .replace(/\s*·\s*不可忽视的长尾群体/g, '')
        .trim();

      const applySlide = () => {
        root.dataset.bgIndex = String(next);
        if (title) title.textContent = slide.title;
        if (lede) lede.textContent = slide.lede;
        if (name) name.textContent = getMobilePersonaName(slide.name);
        if (chipRow) {
          chipRow.innerHTML = slide.chips.map((chip) => `<span class="m-chip">${escapeMobileHtml(chip)}</span>`).join('');
        }
        if (quotes) {
          quotes.innerHTML = slide.quotes.map((quote) => `<div>${escapeMobileHtml(quote)}</div>`).join('');
        }
        if (count) count.textContent = counterText(next, slides.length);
        updateMobileStatus(root, `用户画像：${slide.title}`, next, slides.length);
        applyTextProtection(root);
        syncMobilePersonaSpacing();
        window.requestAnimationFrame(syncMobilePersonaSpacing);
      };

      const syncMobilePersonaSpacing = () => {
        const lede = root.querySelector('.m-persona-lede');
        const title = root.querySelector('.m-persona-title');
        const info = root.querySelector('.m-persona-info');
        const arrows = root.querySelector(':scope > .m-arrow-row');
        if (!info || !arrows) return;
        const targetGap = 20;
        if (lede && title) {
          const titleTop = Math.round(lede.offsetTop + lede.offsetHeight + targetGap);
          root.style.setProperty('--mobile-persona-title-top', `${titleTop}px`);
        }
        const rootHeight = root.getBoundingClientRect().height;
        const infoBottom = info.offsetTop + info.offsetHeight;
        const arrowHeight = arrows.offsetHeight || 44;
        const arrowBottom = Math.max(30, Math.round(rootHeight - infoBottom - targetGap - arrowHeight));
        root.style.setProperty('--mobile-persona-arrow-bottom', `${arrowBottom}px`);
      };

      window.clearTimeout(root._mobilePersonaLeaveTimer);
      window.clearTimeout(root._mobilePersonaDoneTimer);

      if (!shouldAnimate) {
        root.classList.remove('is-mobile-persona-leaving', 'is-mobile-persona-entering');
        root._mobilePersonaAnimating = false;
        applySlide();
        return;
      }

      if (root._mobilePersonaAnimating) return;
      root._mobilePersonaAnimating = true;
      root.dataset.mobilePersonaDirection = direction > 0 ? 'next' : 'prev';
      root.classList.remove('is-mobile-persona-entering');
      root.classList.add('is-mobile-persona-leaving');

      root._mobilePersonaLeaveTimer = window.setTimeout(() => {
        applySlide();
        root.classList.remove('is-mobile-persona-leaving');
        root.classList.add('is-mobile-persona-entering');
        root._mobilePersonaDoneTimer = window.setTimeout(() => {
          root.classList.remove('is-mobile-persona-entering');
          root._mobilePersonaAnimating = false;
        }, 460);
      }, 170);
    }

    function renderMobileJourneyTabs(root, slides, activeIndex) {
      const tabsHost = root.querySelector('.m-journey-tabs');
      if (!tabsHost) return;
      tabsHost.textContent = '';
      const current = slides[activeIndex];
      const title = document.createElement('div');
      title.className = 'm-journey-current-title blend-difference';
      title.textContent = current ? current.title : '';
      tabsHost.appendChild(title);
    }

    function renderMobileJourneyShot(root, slide) {
      const shot = root.querySelector('.m-journey-shot');
      if (!shot) return;
      const images = Array.isArray(slide.images) ? slide.images : [];
      if (shot._mobileJourneyShotTimer) {
        window.clearInterval(shot._mobileJourneyShotTimer);
        shot._mobileJourneyShotTimer = null;
      }
      shot.textContent = '';
      shot.classList.toggle('is-empty', !images.length);
      shot.dataset.mobileShotIndex = '0';
      images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = window.projectDetailAssetUrl ? window.projectDetailAssetUrl(src) : src;
        img.alt = '';
        img.loading = 'lazy';
        img.classList.toggle('is-active', index === 0);
        shot.appendChild(img);
      });
      shot.scrollLeft = 0;
      if (images.length > 1 && !(window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion())) {
        shot._mobileJourneyShotTimer = window.setInterval(() => {
          const rendered = Array.from(shot.querySelectorAll('img'));
          if (rendered.length < 2) return;
          const nextIndex = ((parseInt(shot.dataset.mobileShotIndex || '0', 10) || 0) + 1) % rendered.length;
          shot.dataset.mobileShotIndex = String(nextIndex);
          rendered.forEach((img, index) => img.classList.toggle('is-active', index === nextIndex));
        }, 3000);
      }
    }

    function renderMobileJourneyCopy(copyText) {
      const escape = (value) => String(value).replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[ch]);
      const headings = new Set([
        '强化品牌背书与 DTC 利益点',
        '科技降维解释与构建社会认同',
        '手机端与场景化分类导航',
        '多维过滤矩阵：场景 + 参数 + 排序',
        '性能优化与动画瘦身',
        'Key Features 前置与 A+ 实拍',
        '参数规范化与图示辅助',
        '多维视觉预览 (3D/视频) 与难点弹窗',
        '卖点文字折叠与防呆 SKU',
        '官网 Benefit 硬植入与大促氛围',
        '无缝侧边抽屉交互 (Slide-out)',
        '复杂赠品逻辑折叠'
      ]);
      const [body = '', resultRaw = ''] = String(copyText).split(/\n数据成果：\n?/);
      const bodyHtml = body.split('\n').map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '<div class="journey-copy-gap"></div>';
        const cls = headings.has(trimmed) ? 'journey-head blend-difference' : 'journey-copy-line';
        return `<div class="${cls}">${escape(trimmed)}</div>`;
      }).join('');
      const result = resultRaw.trim();
      if (!result) return bodyHtml;
      const metrics = [];
      const copyLines = [];
      result.split('\n').map((line) => line.trim()).filter(Boolean).forEach((line) => {
        const splitIndex = line.indexOf('：');
        if (splitIndex < 0) {
          copyLines.push(line);
          return;
        }
        const metricText = line.slice(0, splitIndex).trim();
        const copyLine = line.slice(splitIndex + 1).trim();
        metricText.split(/\s*\/\s*/).map((item) => item.trim()).filter(Boolean).forEach((item) => {
          const match = item.match(/^(.+?)\s*([+-]?\d+(?:\.\d+)?(?:pp|%|s)?|<\s*\d+(?:\.\d+)?s|1\s*层直达)$/i);
          metrics.push(match ? { label: match[1].trim(), value: match[2].replace(/\s+/g, '') } : { label: '关键指标', value: item });
        });
        if (copyLine) copyLines.push(copyLine);
      });
      const metricsHtml = metrics.length
        ? `<div class="journey-metrics">${metrics.map((item) => `<div class="journey-metric"><div class="journey-metric-value">${escape(item.value)}</div><div class="journey-metric-label">${escape(item.label)}</div></div>`).join('')}</div>`
        : '';
      const resultCopyHtml = copyLines.length
        ? `<div class="journey-result-copy">${escape(copyLines.join('\n'))}</div>`
        : '';
      return `${bodyHtml}<div class="journey-copy-gap"></div><div class="journey-head blend-difference">数据成果</div>${metricsHtml}${resultCopyHtml}`;
    }

    function setMobileJourney(index, syncDesktop = true) {
      const root = mobileRoot.querySelector('[data-mobile-journey]');
      const slides = window.journeySlides || [];
      if (!root || !slides.length) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      const slide = slides[next];
      root.dataset.bgIndex = String(next);
      root.dataset.bgCount = String(slides.length);
      if (syncDesktop && window.setJourneySlide) window.setJourneySlide(next);
      root.querySelectorAll('.m-switch-count').forEach((node) => {
        node.textContent = counterText(next, slides.length);
      });
      updateMobileStatus(root, `用户旅程：${slide.title}`, next, slides.length);
      renderMobileJourneyTabs(root, slides, next);
      renderMobileJourneyShot(root, slide);
      const copy = root.querySelector('.m-journey-copy');
      const quote = root.querySelector('.m-journey-quote');
      const pains = root.querySelector('.m-journey-pains');
      const desktopQuote = document.querySelector('#c9 .quote');
      const desktopPains = Array.from(document.querySelectorAll('#c9 .pains .pain'));
      if (copy) copy.innerHTML = renderMobileJourneyCopy(slide.copy);
      if (quote && desktopQuote) quote.textContent = desktopQuote.textContent.trim();
      if (pains && desktopPains.length) {
        pains.textContent = '';
        desktopPains.forEach((pain) => {
          const item = document.createElement('div');
          item.className = 'm-journey-pain';
          item.textContent = pain.textContent.trim();
          pains.appendChild(item);
        });
      }
      applyTextProtection(root);
      if (copy) {
        const syncJourneyCopyHeight = () => {
          root.style.setProperty('--mobile-journey-copy-height', `${copy.scrollHeight}px`);
        };
        syncJourneyCopyHeight();
        window.requestAnimationFrame(syncJourneyCopyHeight);
      }
    }

    mobileRoot.querySelectorAll('[data-mobile-journey-index]').forEach((button) => {
      button.addEventListener('click', () => {
        setMobileJourney(parseInt(button.dataset.mobileJourneyIndex || '0', 10) || 0);
      });
    });

    mobileRoot.querySelectorAll('[data-bg-step]').forEach((button) => {
      button.addEventListener('click', () => {
        window.requestAnimationFrame(() => {
          const target = button.closest('[data-bg-count]');
          if (!target) return;
          const index = parseInt(target.dataset.bgIndex || '0', 10) || 0;
          if (target.id === 'm-mobile-challenges') syncMobileFriction(index);
          if (target.matches('[data-mobile-persona]')) {
            const step = parseInt(button.dataset.bgStep || '0', 10) || 0;
            setMobilePersona(index, step);
          }
          if (target.matches('[data-mobile-journey]')) setMobileJourney(index);
        });
      });
    });

    function syncMobileFinalShots() {
      const root = mobileRoot.querySelector('.m-final-mobile');
      const frame = root && root.querySelector('.m-final-mobile__frame');
      const desktopShots = Array.from(document.querySelectorAll('#c11 .final-shot'));
      if (!root || !frame) return;
      const maxCount = Math.max(1, parseInt(root.dataset.mobileFinalCount || '0', 10) || desktopShots.length || 1);
      const configuredShots = Array.isArray(window.projectDetailMobileFinalImages)
        ? window.projectDetailMobileFinalImages
            .filter((shot) => shot && shot.src)
            .slice(0, maxCount)
            .map((shot, index) => ({
              src: shot.src,
              alt: shot.alt || `页面浏览素材 ${index + 1}`
            }))
        : [];
      const fallbackShots = desktopShots
        .slice(0, maxCount)
        .map((shot, index) => ({
          src: shot.getAttribute('src') || '',
          alt: shot.getAttribute('alt') || `页面浏览素材 ${index + 1}`
        }))
        .filter((shot) => shot.src);
      const sourceShots = configuredShots.length ? configuredShots : fallbackShots;
      if (!sourceShots.length) return;
      const desktopSrcs = sourceShots.map((shot) => shot.src);
      const currentSrcs = Array.from(frame.querySelectorAll('.m-final-mobile__shot')).map((shot) => shot.getAttribute('src') || '');
      if (desktopSrcs.join('|') === currentSrcs.join('|')) return;
      frame.textContent = '';
      sourceShots.forEach((shot, index) => {
        const img = document.createElement('img');
        img.className = `m-final-mobile__shot${index === 0 ? ' is-active' : ''}`;
        img.src = shot.src;
        img.alt = shot.alt;
        img.loading = index === 0 ? 'eager' : 'lazy';
        frame.appendChild(img);
      });
    }

    function updateMobileFinalCounter(root, index) {
      const shots = Array.from(root.querySelectorAll('.m-final-mobile__shot'));
      root.dataset.mobileFinalIndex = String(index);
      shots.forEach((shot, shotIndex) => shot.classList.toggle('is-active', shotIndex === index));
      root.querySelectorAll('.m-switch-count').forEach((node) => {
        node.textContent = counterText(index, shots.length);
      });
      updateMobileStatus(root, '页面浏览预览', index, shots.length);
    }

    function scheduleMobileFinalScrollIdle(root, frame) {
      if (!root || !frame) return;
      window.clearTimeout(root._mobileFinalScrollIdleTimer);
      const lastTop = frame.scrollTop;
      root._mobileFinalScrollIdleTimer = window.setTimeout(() => {
        window.requestAnimationFrame(() => {
          if (Math.abs(frame.scrollTop - lastTop) > 1) {
            scheduleMobileFinalScrollIdle(root, frame);
            return;
          }
          root.classList.remove('is-final-scrolling');
        });
      }, 180);
    }

    function scrollMobileFinalFrame(frame, targetTop) {
      const duration = 220;
      const startTop = frame.scrollTop;
      const distance = targetTop - startTop;
      const startTime = window.performance.now();
      const root = frame.closest('.m-final-mobile');
      if (root) {
        root.classList.add('is-final-scrolling');
        window.clearTimeout(root._mobileFinalScrollIdleTimer);
      }
      if (frame._mobileFinalScrollRaf) {
        window.cancelAnimationFrame(frame._mobileFinalScrollRaf);
      }
      const tick = (now) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        frame.scrollTop = startTop + distance * eased;
        if (progress < 1) {
          frame._mobileFinalScrollRaf = window.requestAnimationFrame(tick);
          return;
        }
        frame._mobileFinalScrollRaf = null;
        scheduleMobileFinalScrollIdle(root, frame);
      };
      frame._mobileFinalScrollRaf = window.requestAnimationFrame(tick);
    }

    function setMobileFinal(index) {
      const root = mobileRoot.querySelector('.m-final-mobile');
      if (!root) return;
      syncMobileFinalShots();
      const frame = root.querySelector('.m-final-mobile__frame');
      const shots = Array.from(root.querySelectorAll('.m-final-mobile__shot'));
      if (!frame || !shots.length) return;
      const next = ((index % shots.length) + shots.length) % shots.length;
      updateMobileFinalCounter(root, next);
      const frameStyle = window.getComputedStyle(frame);
      const framePaddingTop = parseFloat(frameStyle.paddingTop) || 0;
      const targetTop = Math.max(0, shots[next].offsetTop - framePaddingTop);
      if (window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion()) {
        frame.scrollTop = targetTop;
      } else {
        scrollMobileFinalFrame(frame, targetTop);
      }
    }

    mobileRoot.querySelectorAll('[data-mobile-final-step]').forEach((button) => {
      button.addEventListener('click', () => {
        const root = button.closest('.m-final-mobile');
        const current = parseInt(root && root.dataset.mobileFinalIndex || '0', 10) || 0;
        const step = parseInt(button.dataset.mobileFinalStep || '0', 10) || 0;
        setMobileFinal(current + step);
      });
    });

    const mobileFinalRoot = mobileRoot.querySelector('.m-final-mobile');
    const mobileFinalFrame = mobileFinalRoot && mobileFinalRoot.querySelector('.m-final-mobile__frame');
    if (mobileFinalRoot && mobileFinalFrame) {
      let finalScrollRaf = null;
      mobileFinalFrame.addEventListener('scroll', () => {
        mobileFinalRoot.classList.add('is-final-scrolling');
        scheduleMobileFinalScrollIdle(mobileFinalRoot, mobileFinalFrame);
        if (finalScrollRaf) return;
        finalScrollRaf = window.requestAnimationFrame(() => {
          finalScrollRaf = null;
          const shots = Array.from(mobileFinalFrame.querySelectorAll('.m-final-mobile__shot'));
          if (!shots.length) return;
          const frameStyle = window.getComputedStyle(mobileFinalFrame);
          const framePaddingTop = parseFloat(frameStyle.paddingTop) || 0;
          const frameTop = mobileFinalFrame.getBoundingClientRect().top + framePaddingTop;
          let closestIndex = 0;
          let closestDistance = Infinity;
          shots.forEach((shot, index) => {
            const distance = Math.abs(shot.getBoundingClientRect().top - frameTop);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });
          updateMobileFinalCounter(mobileFinalRoot, closestIndex);
        });
      }, { passive: true });
    }

    syncMobileProjectHeader();
    syncMobileHero();
    setMobilePillar(0);
    syncMobileFriction(0);
    syncMobileOrg();
    syncMobileUserResearch();
    syncMobileComponents();
    setMobileTimeline(0);
    setMobilePersona(0);
    setMobileJourney(0);
    setMobileFinal(0);

    if (window.matchMedia) {
      const query = window.matchMedia('(max-width: 767px)');
      const refresh = () => {
        if (!isMobile()) return;
        syncMobileProjectHeader();
        syncMobileHero();
        setMobilePillar(parseInt(mobileRoot.querySelector('[data-mobile-pillar]')?.dataset.bgIndex || '0', 10) || 0, false);
        syncMobileFriction(parseInt(mobileRoot.querySelector('#m-mobile-challenges')?.dataset.bgIndex || '0', 10) || 0);
        syncMobileOrg();
        syncMobileUserResearch();
        syncMobileComponents();
        setMobileTimeline(parseInt(mobileRoot.querySelector('.m-timeline')?.dataset.mobileTimelineIndex || '0', 10) || 0);
        setMobilePersona(parseInt(mobileRoot.querySelector('[data-mobile-persona]')?.dataset.bgIndex || '0', 10) || 0);
        setMobileJourney(parseInt(mobileRoot.querySelector('[data-mobile-journey]')?.dataset.bgIndex || '0', 10) || 0);
      };
      if (query.addEventListener) query.addEventListener('change', refresh);
    }
    if (window.fdProjectPrefersReducedMotion && window.fdProjectPrefersReducedMotion()) {
      window.fdProjectStopContinuousMotion();
    }
  })();



  /* ── 指标数字 count-up：进入视口时从 0 滚动到目标值，尊重 reduced-motion ── */
  (function () {
    const targets = Array.from(document.querySelectorAll('.h-stat .value, .c-hero-stats .stat-l .v, .m-stat__value, .m-hero-stat__value'));
    if (!targets.length) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function parse(raw) {
      const text = (raw || '').trim();
      const match = text.match(/^(\D*?)([\d.,]+)(.*)$/s);
      if (!match) return null;
      const numToken = match[2];
      const decimals = numToken.includes('.') ? (numToken.split('.')[1] || '').length : 0;
      return {
        prefix: match[1] || '',
        suffix: match[3] || '',
        decimals,
        grouping: numToken.includes(','),
        value: parseFloat(numToken.replace(/,/g, '')) || 0
      };
    }

    function format(spec, v) {
      const fixed = v.toFixed(spec.decimals);
      let [intPart, decPart] = fixed.split('.');
      if (spec.grouping) intPart = Number(intPart).toLocaleString('en-US');
      return spec.prefix + intPart + (decPart ? '.' + decPart : '') + spec.suffix;
    }

    targets.forEach((el) => {
      const spec = parse(el.textContent);
      if (!spec) return;
      el.style.fontVariantNumeric = 'tabular-nums';
      el.dataset.countSpec = '1';
      el._countSpec = spec;
      if (reduceMotion) return;
      /* 仅把当前可见的指标归零，隐藏的另一套 DOM 保留真值，避免跨断点 resize 后卡在 0 */
      if (el.offsetParent !== null) el.textContent = format(spec, 0);
    });

    function run(el) {
      const spec = el._countSpec;
      if (!spec) return;
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / 1100);
        el.textContent = format(spec, spec.value * easeOutCubic(t));
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = format(spec, spec.value);
      }
      requestAnimationFrame(tick);
    }

    if (reduceMotion) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target._counted) {
            entry.target._counted = true;
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px 25% 0px' });
      targets.forEach((el) => io.observe(el));
    } else {
      targets.forEach((el) => { el._counted = true; run(el); });
    }
  })();



  /* ── Item 3：轮播方向键。焦点在任一 .nav-arrows 组内时，←/→ 切上一个/下一个 ── */
  (function () {
    document.querySelectorAll('.nav-arrows').forEach((group) => {
      group.setAttribute('role', 'group');
      group.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        const btn = group.querySelector(event.key === 'ArrowLeft' ? '.prev' : '.next');
        if (!btn) return;
        event.preventDefault();
        btn.click();
      });
    });
  })();
