document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('content');
    const homeLink = document.getElementById('home-link');
    const catalogLink = document.getElementById('catalog-link');
    const specialsLink = document.getElementById('specials-link');

    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        contentDiv.innerHTML = '<p>Привітики! Ти можеш вибрати шось із "Каталог" або "Specials"</p>';
    });

    catalogLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetch('categories.json')
            .then(response => response.json())
            .then(data => {
                let html = '<h2>Категорії</h2><ul>';
                data.forEach(category => {
                    html += `<li><a href="#" data-category="${category.shortname}">${category.name}</a></li>`;
                });
                html += '</ul>';
                contentDiv.innerHTML = html;
            })
            .catch(error => console.error('Помилка:', error));
    });

    specialsLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetch('categories.json')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomCategory = data[randomIndex].shortname;
                loadProducts(randomCategory);
            });
    });

    function loadProducts(categoryShortname) {
        fetch(`${categoryShortname}.json`)
            .then(response => response.json())
            .then(data => {
                let html = `<h2>${data.categoryName}</h2><ul>`;
                data.products.forEach(product => {
                    html += `
                        <li>
                            <img src="https://place-hold.it/200x200" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Ціна: ${product.price} грн</p>
                        </li>
                    `;
                });
                html += '</ul>';
                contentDiv.innerHTML = html;
            })
            .catch(error => console.error('Помилка:', error));
    }

    contentDiv.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.dataset.category) {
            e.preventDefault();
            loadProducts(e.target.dataset.category);
        }
    });
});
