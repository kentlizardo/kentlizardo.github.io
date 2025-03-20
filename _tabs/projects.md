---
icon: fa-solid fa-diagram-project
order: 2
---

{% assign projects = site.projects %}

{%- if jekyll.environment == 'production' -%}
  {% assign projects = projects | where: "placeholder", "true" %}
{%- endif -%}
{% assign sorted_projects = projects | sort %}

## Research

<section class="projects">

{% for project in sorted_projects %}
  {% if project.topics[0] == "Research" %}
    {% include project-card.html project=project %}
  {% endif %}
{% endfor %}

</section>

## Personal

<section class="Personal">

{% for project in sorted_projects %}
  {% if project.topics[0] == "Personal" %}
    {% include project-card.html project=project %}
  {% endif %}
{% endfor %}

</section>
