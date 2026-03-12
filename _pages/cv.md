---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---
{% include base_path %}

<center><a href="#education">Education</a> – <a href="#work">Work Experience</a> – <a href="#reviewer">Reviewer</a> – <a href="#institutional-service">Institutional Service</a> – <a href="#organizations">Organizations</a> – <a href="#outreach">Outreach</a></center>

<!-- <p style="font-size:0.9em">You can download a PDF of my CV <a href="TODO" target="_blank">here</a>.  -->

You can find my education history, reviewer history, institutional service, and organization affiliations below, and you can find all other information via the links above (e.g. "Awards", "Research", etc.).

<h2 id="education">Education</h2>
<ul>
  <li><b><u>Ph.D. in Computer Science (2020–Present)</u></b></li>
  <ul style="font-size:0.75em">
    <li><a href="https://ucsd.edu/" target="_blank">University of California San Diego</a></li>
    <li>Co-advised by <a href="https://cseweb.ucsd.edu/~leporter/" target="_blank">Leo Porter</a> and <a href="https://cseweb.ucsd.edu/~wgg/" target="_blank">William G. Griswold</a></li>
  </ul>
  <li><b><u>M.S. in Computer Science (2018-2020)</u></b></li>
  <ul style="font-size:0.75em">
    <li><a href="https://ucsd.edu/" target="_blank">University of California San Diego</a></li>
    <li>Co-advised by <a href="https://cseweb.ucsd.edu/~leporter/" target="_blank">Leo Porter</a> and <a href="https://cseweb.ucsd.edu/~wgg/" target="_blank">William G. Griswold</a></li>
  </ul>
  <li><b><u>B.S. in Cognitive Science with a Specialization in Human-Computer Interaction (2013–2017)</u></b></li>
  <ul style="font-size:0.75em">
    <li><a href="https://ucsd.edu/" target="_blank">University of California San Diego</a></li>
    <li>Minor in <a href="https://cse.ucsd.edu/undergraduate/minor-computer-science" target="_blank">Computer Science</a></li>
  </ul>
  <li><b><u>FU-Best Program (August-December 2015)</u></b></li>
  <ul style="font-size:0.75em">
    <li><a href="https://www.fu-berlin.de/en/sites/fubest/index.html" target="_blank">Freie University, Berlin, Germany</a></li>
  </ul>
</ul>

<center>— <a href="#top">Top</a> —</center>

<h2 id="work">Work Experience</h2>

<li><b><u>Software Engineer (September 2017-September 2018)</u></b></li>
  <ul style="font-size:0.75em">
    <li>DataSense Analytics, San Diego</li>
  </ul>

<center>— <a href="#top">Top</a> —</center>

<h2 id="reviewer">Reviewer</h2>
{% assign reviewer_sorted = site.reviewer | sort: 'title' %}
<ul>
  <!-- <li><b><u>Grants/Awards</u></b></li>
  <ul style="font-size:0.75em">{% for post in reviewer_sorted %}
    {% if post.reviewertype == 'award' %}
      <li><a href="{{ post.venueurl }}" target="_blank">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}</ul>
  <li><b><u>Journals</u></b></li>
  <ul style="font-size:0.75em">{% for post in reviewer_sorted %}
    {% if post.reviewertype == 'journal' %}
      <li><a href="{{ post.venueurl }}" target="_blank">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}</ul> -->
  <li><b><u>Conferences</u></b></li>
  <ul style="font-size:0.75em">{% for post in reviewer_sorted %}
    {% if post.reviewertype == 'conference' %}
      <li><a href="{{ post.venueurl }}" target="_blank">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}</ul>
</ul>

<center>— <a href="#top">Top</a> —</center>

<h2 id="institutional-service">Institutional Service</h2>
{% assign service_sorted = site.service | sort: 'enddate' %}
<ul>{% for post in service_sorted reversed %}
  {% if post.servicetype == 'institutional' %}
    <li>
      <b><u>{{ post.title }}</u></b>
      <ul style="font-size:0.75em">
        <li><u>Group</u>: {{ post.group }}</li>
        <li><u>Duration</u>: {{ post.startdate }} to {{ post.enddate }}</li>
      </ul>
    </li>
  {% endif %}
{% endfor %}</ul>

<center>— <a href="#top">Top</a> —</center>

<h2 id="organizations">Organizations</h2>
<ul>{% for post in service_sorted reversed %}
  {% if post.servicetype == 'organization' %}
    <li>
      <b><u>{{ post.title }}</u></b>
      <ul style="font-size:0.75em">
        <li><u>Group</u>: {{ post.group }}</li>
        <li><u>Duration</u>: {{ post.startdate }} to {{ post.enddate }}</li>
      </ul>
    </li>
  {% endif %}
{% endfor %}</ul>

<center>— <a href="#top">Top</a> —</center>

<h2 id="outreach">Outreach</h2>
<ul>{% for post in service_sorted reversed %}
  {% if post.servicetype == 'outreach' %}
    <li>
      <b><u>{{ post.title }}</u></b>
      <ul style="font-size:0.75em">
        <li><u>Group</u>: {{ post.group }}</li>
        <li><u>Duration</u>: {{ post.startdate }} to {{ post.enddate }}</li>
      </ul>
    </li>
  {% endif %}
{% endfor %}</ul>

<center>— <a href="#top">Top</a> —</center>
