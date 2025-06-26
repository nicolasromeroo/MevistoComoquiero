document.addEventListener('DOMContentLoaded', () => {

    function toggleCatalogForm() {
        const formContainer = document.getElementById('catalog-form-container');
        const isVisible = formContainer.style.display === 'block';
        formContainer.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) document.getElementById('catalog-form').reset();
    }

    document.getElementById('btn-new-catalog').onclick = toggleCatalogForm;

    document.getElementById('catalog-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;

        const body = {
            title: form.title.value.trim(),
            imgBanner: form.bannerImage.value.trim(),
            description: form.description.value.trim()
        };

        const res = await fetch('https://mevistocomoquiero.onrender.com/api/cards/createCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            form.reset();
            document.getElementById('catalog-form-container').style.display = 'none';
            await loadCatalogCards();
        } else {
            const { error } = await res.json();
            alert('Error: ' + error);
        }
    });

    async function loadCatalogCards() {
        const container = document.getElementById('catalog-container');
        const catalogs = await fetch('http://localhost:8080/api/cards/catalogo')
            .then(res => res.json());

        container.innerHTML = '';

        catalogs.forEach(c => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${c.imgBanner}" alt="${c.title}" style="width:100%; height: 150px; object-fit: cover;" />
                <h3>${c.title}</h3>
                <p>${c.description}</p>
                <a href="/productList.html?slug=${c.slug}">Ver productos</a>
            `;
            container.appendChild(card);
        });
    }

    loadCatalogCards();
});
