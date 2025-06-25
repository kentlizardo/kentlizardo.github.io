---
icon: fa-solid fa-diagram-project
order: 2
---

{% assign projects = site.projects %}

{%- if jekyll.environment == 'production' -%}
  {% assign projects = projects | where_exp: "project", 'project.placeholder != true' %}
{%- endif -%}
{% assign sorted_projects = projects | sort: "order" | reverse %}

---

{% assign research_projects = sorted_projects | where_exp:"project", 'project.topics[0] == "Research"' %}
{% assign games_projects = sorted_projects | where_exp:"project", 'project.topics[0] == "Games"' %}

## Research

<section class="projects">
{% for project in research_projects %}
  {% assign include_link = 'custom/project-card.html' %}
  {% if project.card_style.type %}
    {% capture include_link %}custom/project-card-{{project.card_style.type}}.html{% endcapture %}
  {% endif %}
  {% include {{ include_link }} project=project %}
{% endfor %}
</section>

---

## Games

<section class="projects">

{% for project in games_projects %}
  {% assign include_link = 'custom/project-card.html' %}
  {% if project.card_style.type %}
    {% capture include_link %}custom/project-card-{{project.card_style.type}}.html{% endcapture %}
  {% endif %}
  {% include {{ include_link }} project=project %}
{% endfor %}

</section>
