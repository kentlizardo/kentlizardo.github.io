---
icon: fa-solid fa-diagram-project
order: 2
---

{% assign projects = site.projects %}

{%- if jekyll.environment == 'production' -%}
  {% assign projects = projects | where: "placeholder", "true" %}
{%- endif -%}
{% assign sorted_projects = projects | sort %}

<section class="projects" id="projects">

{% for project in sorted_projects %}

{% include project-card.html project=project %}

{% endfor %}

</section>
