import os
import re

# New Navbar structure
NAVBAR_LINKS = """
            <ul class="nav-links" style="display: flex; align-items: center; gap: 1.2rem;">
                <li><a href="index.html" class="link-underline {active_accueil}" data-t="accueil">Accueil</a></li>
                <li><a href="missions-organigramme.html" class="link-underline {active_missions}" data-t="missions">Missions</a></li>
                <li><a href="programmes.html" class="link-underline {active_programmes}" data-t="programmes">Programmes</a></li>
                <li><a href="projets.html" class="link-underline {active_projets}">Projets</a></li>
                <li><a href="galerie.html" class="link-underline {active_galerie}">Galerie</a></li>
                <li><a href="actualites.html" class="link-underline {active_actualites}" data-t="actualites">Actualités</a></li>
                <li>
                    <a href="#" class="link-underline {active_plus}">Plus <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem; margin-left: 3px;"></i></a>
                    <div class="dropdown-menu">
                        <a href="associations.html" class="dropdown-item"><i class="fa-solid fa-users"></i> Associations</a>
                        <a href="ressources.html" class="dropdown-item"><i class="fa-solid fa-book"></i> Ressources</a>
                        <a href="evenements.html" class="dropdown-item"><i class="fa-solid fa-calendar-days"></i> Événements</a>
                        <a href="faq.html" class="dropdown-item"><i class="fa-solid fa-circle-question"></i> FAQ</a>
                        <a href="contact.html" class="dropdown-item {active_contact}"><i class="fa-solid fa-envelope"></i> Contact</a>
                        <a href="archives.html" class="dropdown-item"><i class="fa-solid fa-box-archive"></i> Archives</a>
                    </div>
                </li>
            </ul>
"""

MOBILE_MENU = """
    <div class="mobile-menu" id="mobileMenu">
        <a href="index.html">Accueil</a>
        <a href="missions-organigramme.html">Missions</a>
        <a href="programmes.html">Programmes</a>
        <a href="projets.html">Projets</a>
        <a href="galerie.html">Galerie</a>
        <a href="actualites.html">Actualités</a>
        <a href="associations.html">Associations</a>
        <a href="ressources.html">Ressources</a>
        <a href="evenements.html">Événements</a>
        <a href="faq.html">FAQ</a>
        <a href="contact.html">Contact</a>
        <a href="archives.html">Archives</a>
        <a href="login.html" class="btn-primary" style="margin-top: 1rem;">Connexion</a>
    </div>
"""

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove News Ticker
    # Regex to catch the news-ticker div and its content
    content = re.sub(r'<!-- News Ticker -->\s*<div class="news-ticker">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
    # Also catch cases where it might be slightly different
    content = re.sub(r'<div class="news-ticker">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
    # And the simplest form
    content = re.sub(r'<div class="news-ticker">.*?</div>', '', content, flags=re.DOTALL)

    # 2. Identify active links
    filename = os.path.basename(filepath)
    active_map = {
        "accueil": "active" if filename == "index.html" else "",
        "missions": "active" if filename == "missions-organigramme.html" else "",
        "programmes": "active" if filename == "programmes.html" else "",
        "projets": "active" if filename == "projets.html" else "",
        "galerie": "active" if filename == "galerie.html" else "",
        "actualites": "active" if filename == "actualites.html" else "",
        "contact": "active" if filename == "contact.html" else "",
        "plus": "active" if filename in ["associations.html", "ressources.html", "evenements.html", "faq.html", "archives.html"] else ""
    }

    new_navbar = NAVBAR_LINKS.format(**{f"active_{k}": v for k, v in active_map.items()})

    # 3. Replace Navbar
    # Target the <ul class="nav-links">...</ul>
    content = re.sub(r'<ul class="nav-links".*?</ul>', new_navbar.strip(), content, flags=re.DOTALL)

    # 4. Replace Mobile Menu
    content = re.sub(r'<div class="mobile-menu" id="mobileMenu">.*?</div>', MOBILE_MENU.strip(), content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename}")

if __name__ == "__main__":
    directory = r"c:\Users\CHRIST-VIANNEY\Desktop\az"
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            update_file(os.path.join(directory, filename))
