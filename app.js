const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
const wikiform = document.querySelector('form');
const results = document.querySelector('.results');
const error = document.querySelector('.error');
var keyword = document.getElementById('search_value');
let loader = document.getElementById('loader-wrapper');

wikiform.addEventListener('submit', (e) => {
	e.preventDefault();
	var searchFor = keyword.value;
	if (!searchFor) {
		$('.error').html("<h2 class='error'>enter proper keyword</h2>");
		$('.error').fadeIn(1000);
		$('.error').fadeOut(4000);
		return;
	}
	fetchWikis(searchFor);
});

const fetchWikis = async (value) => {
	try {
		loader.style.display = 'flex';

		const response = await fetch(`${url},${value}`);

		//whole lot of data
		const data = await response.json();

		//parsing till imp fields
		const result = data.query.search;
		console.log(result);

		if (result.length < 1) {
			error.innerHTML = "<h2 class='error'>no results found</h2>";
			$('.error').fadeIn(1000);
			$('.error').fadeOut(4000);
			return;
		}
		renderResults(result);
	} catch (error) {
		$('.error').html("<h2 class='error'>there was an error :( </h2>");
		$('.error').fadeIn(1000);
		return;
	} finally {
		loader.style.display = 'none';
	}
};

const renderResults = async (wiki) => {
	const cards = wiki
		.map((wiki) => {
			const { title, snippet, pageid } = wiki;
			return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
              <h4>${title}</h4>
              <p>
                ${snippet}
              </p>
            </a><hr>`;
		})
		.join('');

	results.innerHTML = `<div class="articles">
          ${cards}
        </div>`;
};
