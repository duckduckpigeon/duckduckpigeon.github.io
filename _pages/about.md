---
permalink: /
title: "About"
excerpt: "About"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<!-- <div style="background-image: url('../images/shirt.jpg'); background-size: cover; padding: 20px;"></div> -->


Join us for a Labor Day 2026 wedding weekend in San Diego!

<video width="100%" controls poster="../images/video_thumbnail.jpg">
  <source src="../images/gettingmarried_v5.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<div class="rsvp-cta-wrap">
  <a href="/rsvp/" class="rsvp-cta-btn">RSVP Here!</a>
</div>

<style>
  .rsvp-cta-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    background: #418aa0;
    transform: translateZ(0);
    margin-bottom: 1em;
  }
  .rsvp-cta-btn {
    position: relative;
    z-index: 2;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0.9em 1.5em;
    background: transparent;
    color: #fff;
    font-weight: bold;
    font-size: 1.1em;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
    text-shadow: 0 1px 3px rgba(0,0,0,0.6);
  }
  .rsvp-fly-img {
    position: absolute;
    z-index: 1;
    left: var(--start-x);
    top: var(--start-y);
    width: var(--fly-size);
    transform: translate(-50%, -50%) rotate(0deg);
    animation: rsvp-fly var(--fly-duration) linear forwards;
    pointer-events: none;
  }
  @keyframes rsvp-fly {
    from { left: var(--start-x); top: var(--start-y); transform: translate(-50%, -50%) rotate(0deg); }
    to   { left: var(--end-x);   top: var(--end-y);   transform: translate(-50%, -50%) rotate(var(--spin)); }
  }
</style>

<script>
  /* Ambient flying-pigeon effect for the RSVP button.
     Block comments only -- Jekyll's compressor swallows // line comments in production. */
  (function () {
    var wrap = document.querySelector('.rsvp-cta-wrap');
    if (!wrap) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function randomPerimeterPoint() {
      var side = Math.floor(Math.random() * 4);
      var t = Math.random() * 140 - 20; /* -20 to 120 */
      if (side === 0) return { x: t, y: -20 };
      if (side === 1) return { x: 120, y: t };
      if (side === 2) return { x: t, y: 120 };
      return { x: -20, y: t };
    }

    function spawnFlyer() {
      var img = document.createElement('img');
      img.src = '/images/popin/pidge' + parseInt(Math.random() * 14) + '.png';
      img.className = 'rsvp-fly-img';

      var start = randomPerimeterPoint();
      var end = { x: 100 - start.x, y: 100 - start.y };
      img.style.setProperty('--start-x', start.x + '%');
      img.style.setProperty('--start-y', start.y + '%');
      img.style.setProperty('--end-x', end.x + '%');
      img.style.setProperty('--end-y', end.y + '%');

      var spinMag = 90 + Math.random() * 270;
      var spin = (Math.random() < 0.5 ? -1 : 1) * spinMag;
      img.style.setProperty('--spin', spin + 'deg');

      img.style.setProperty('--fly-size', (28 + Math.random() * 14) + 'px');
      img.style.setProperty('--fly-duration', (3 + Math.random() * 1.5) + 's');
      wrap.appendChild(img);
      img.addEventListener('animationend', function () { img.remove(); });
    }

    var rampStart = Date.now();
    var baseInterval = 400;
    var maxMultiplier = 5;
    var rampDelayMs = 10000;
    var rampDurationMs = 60000;

    function currentInterval() {
      var elapsed = Date.now() - rampStart;
      var rampElapsed = Math.max(elapsed - rampDelayMs, 0);
      var progress = Math.min(rampElapsed / rampDurationMs, 1);
      var multiplier = 1 + (maxMultiplier - 1) * progress;
      return baseInterval / multiplier;
    }

    var spawnTimer;
    function scheduleNext() {
      spawnTimer = setTimeout(function () {
        spawnFlyer();
        scheduleNext();
      }, currentInterval());
    }
    scheduleNext();

    document.addEventListener('visibilitychange', function () {
      clearTimeout(spawnTimer);
      if (!document.hidden) scheduleNext();
    });
  })();
</script>

<img src="../images/Mission Bay Arial.jpg" alt="Map of ocean, home, where venue is" width="500">
<!-- <a href="#about-overview">Overview of the Weekend</a> – <a href="#about-friday">Friday</a> –  <a href="#about-weddingday">Wedding Day</a>
<br>
<br> -->
<h2 id="about-overview">Overview of the Weekend</h2>

### Friday Evening Casual Brewery Gathering (Sophia's Birthday)

Please join us Friday evening from 7:00-10:00 PM at Stone Brewing at Liberty Station for a casual gathering to celebrate Sophia's birthday. There will be drinks and light bites! Liberty Station has lots of parking so finding parking shouldn't be an issue.

<a id='stone-address' href='https://www.stonebrewing.com/visit/bistros/liberty-station'>
Stone Brewing World Bistro & Gardens – Liberty Station<br>
2816 Historic Decatur Rd UNIT 116<br>
San Diego, CA 92106
</a>

### Saturday Wedding Celebration

Please join us Saturday at 4:30 PM for Sophia and Jeff's wedding celebration at Tower Beach Club! If you are staying at either of the hotels we listed you will be picked up. Otherwise we recommend ubering because the venue will have limited parking. 

<a id='tbc-address' href='https://towerbeachclub.com/'>
Tower Beach Club<br>
1010 Santa Clara Pl<br>
San Diego, CA 92109
</a>



### Sunday & Monday

Relax and Enjoy San Diego




<!-- 
<center>— <a href="#top">Top</a> —</center>

<h2 id="about-Friday">Friday Evening (Sophia's Birthday)</h2>

<center>— <a href="#top">Top</a> —</center>

<h2 id="about-weddingday">Wedding Day</h2>

<center>— <a href="#top">Top</a> —</center> -->