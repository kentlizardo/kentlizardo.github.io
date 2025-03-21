---
icon: fa-solid fa-diagram-project
order: 2
---

{% assign projects = site.projects %}

{%- if jekyll.environment == 'production' -%}
  {% assign projects = projects | where: "placeholder", "true" %}
{%- endif -%}
{% assign sorted_projects = projects | sort: "order" %}

---

{% assign research_projects = sorted_projects | where_exp:"project", 'project.topics[0] == "Research"' %}

## Research

<section class="projects">
{% for project in research_projects %}
  {% include project-card.html project=project %}
{% endfor %}
</section>

---

## Games

<section class="projects">

{% for project in sorted_projects %}
  {% if project.topics[0] == "Games" %}
    {% include project-card.html project=project %}
  {% endif %}
{% endfor %}

</section>
