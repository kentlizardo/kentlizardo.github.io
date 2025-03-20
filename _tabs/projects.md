---
icon: fa-solid fa-diagram-project
order: 2
---

<section class="projects" id="projects">

{%- if jekyll.environment != 'production' -%}

<div class="card categories mb-3" style="max-width: 540px;">
  <div class="row g-0 flex-md-row">

  <div class="col-md-4">
    <img class="card-img preview-img mt-0 px-1 py-1" src="{{ '/assets/img/pfl-icons.png' | absolute_url }}" alt="avatar" onerror="this.style.display='none'">
  </div>

  <div class="col-md-8">
    <div class="card-header d-flex justify-content-between hide-border-bottom">
      <h5 class="card-title header m-0">
      Project Title
      </h5>
    </div>
    <div class="card-body">
    <p class="card-text ">
    Project description and even more text to make this placeholder longer.
    </p>
    <a href="#" class="card-link">link</a>
    <a href="#" class="card-link">source</a>
    </div>
  </div>

  </div>
</div>

{%- endif -%}

{% for project in site.projects %}

<div class="card categories mb-3" style="max-width: 540px;">
  <div class="row g-0 flex-md-row">

  {% assign right_col = '12' %}
  {% if project.image %}
  <div class="col-md-4">
      {% capture src %}src="{{ project.image.path | default: project.image }}"{% endcapture %}
      {% capture class %}class="card-img mt-0 px-1 py-1 preview-img{% if project.image.no_bg %}{{ ' no-bg' }}{% endif %}"{% endcapture %}
      {% capture alt %}alt="{{ project.image.alt | xml_escape | default: "Preview Image" }}"{% endcapture %}
      {% if project.image.lqip %}
        {%- capture lqip -%}lqip="{{ project.image.lqip }}"{%- endcapture -%}
      {% endif %}
      <img {{ src }} {{ class }} {{ alt }} onerror="this.style.display='none'">
        {%- if project.image.alt -%}
          <figcaption class="text-center pt-2 pb-2">{{ project.image.alt }}</figcaption>
        {%- endif -%}
  </div>
  {% assign right_col = '8' %}
  {% endif %}

  <div class="col-md-{{right_col}}">
    <div class="card-header d-flex justify-content-between hide-border-bottom">
      <h5 class="card-title header m-0">
      {{ project.title }}
      </h5>
    </div>
    <div class="card-body">
    <p class="card-text ">
    {{ project.content }}
    </p>
    {% for link in project.links %}
    <a href="{{link[1]}}" class="card-link">{{link[0]}}</a>
    {% endfor %}
    </div>
  </div>

  </div>
</div>

{% endfor %}

</section>
