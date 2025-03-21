---
icon: fa-solid fa-diagram-project
order: 2
---

{% assign projects = site.projects %}

{%- if jekyll.environment == 'production' -%}
  {% assign projects = projects | where: "placeholder", "true" %}
{%- endif -%}
{% assign sorted_projects = projects | sort %}

---

## Research

<section class="projects">

{% assign research_projects = sorted_projects | where_exp:"project", 'project.topics[0] == "Research"' %}
{% assign research_general = '' | split: '' %}

{% assign research_subtopics = '' | split: '' %}
{% for project in research_projects %}
  {% if project.topics[1] %}

    {% assign subtopic = project.topics[1] %}
    {% unless research_subtopics contains subtopic %}
      {% assign research_subtopics = research_subtopics | push: subtopic %}
    {% endunless %}
  
  {% else %}

    {% assign research_general = research_general | push: project %}

  {% endif%}
{% endfor %}
{% assign research_subtopics = research_subtopics | sort %}

{% for project in research_general %}
  {% include project-card.html project=project %}
{% endfor %}

{% for subtopic in research_subtopics %}

  <h3>{{subtopic}}</h3>
  
  {% assign relevant_projects = research_projects | where_exp:'project', 'project.topics[1] == subtopic' %}
  {% for project in relevant_projects %}
    {% include project-card.html project=project %}
  {% endfor %}

{% endfor %}

</section>

---

## Personal

<section class="projects">

{% for project in sorted_projects %}
  {% if project.topics[0] == "Personal" %}
    {% include project-card.html project=project %}
  {% endif %}
{% endfor %}

</section>
