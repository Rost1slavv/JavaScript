document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('content');
    const homeLink = document.getElementById('home-link');
    const catalogLink = document.getElementById('catalog-link');
    const specialsLink = document.getElementById('specials-link');

    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        contentDiv.innerHTML = '<p>Ласкаво просимо! Виберіть "Каталог" або "Specials".</p>';
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
                    let imageSrc = '';
                    if (categoryShortname === 'books') {
                        switch (product.shortname) {
                            case '1984':
                                imageSrc = 'images/1984.png';
                                break;
                            case 'Apaintedbird':
                                imageSrc = 'images/Apaintedbird.png';
                                break;
                            case 'archivekgb':
                                imageSrc = 'images/archivekgb.png';
                                break;
                            case 'slaughterhouseNo5':
                                imageSrc = 'images/slaughterhouseNo5.jpg';
                                break;
                            default:
                                imageSrc = 'https://place-hold.it/200x200';
                        }
                    } else if (categoryShortname === 'electronics') {
                        switch (product.shortname) {
                            case 'smartphone':
                                imageSrc = 'images/smartphone.png';
                                break;
                            case 'laptop':
                                imageSrc = 'images/laptop.png';
                                break;
                            case 'headphones':
                                imageSrc = 'images/headphones.png';
                                break;
                            case 'tablet':
                                imageSrc = 'images/tablet.png';
                                break;
                            default:
                                imageSrc = 'https://place-hold.it/200x200';
                        }
                    } else if (categoryShortname === 'clothing') {
                        switch (product.shortname) {
                            case 'tshirt':
                                imageSrc = 'images/tshirt.png';
                                break;
                            case 'jeans':
                                imageSrc = 'images/jeans.png';
                                break;
                            case 'jacket':
                                imageSrc = 'images/jacket.png';
                                break;
                            case 'hat':
                                imageSrc = 'images/hat.png';
                                break;
                            default:
                                imageSrc = 'https://place-hold.it/200x200';
                        }
                    } else {
                        imageSrc = 'https://place-hold.it/200x200';
                    }
                    html += `
                        <li>
                            <img src="${imageSrc}" alt="${product.name}" onerror="this.src='https://place-hold.it/200x200';">
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
