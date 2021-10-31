const dummyTitleStr =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam distinctio dolorum illo, impedit reprehenderit, ipsam ipsum debitis non incidunt nostrum ullam esse porro id praesentium.";

function getMockArticle(id) {
	/** --------- 1 -----------
	 * (i) Should return an article: {id: string, title: string} for given id and use dummyTitleStr parts for creating random titles
	 * (ii) Wrap the returned object in a promise which resolves in a random time interval between 0 - 2 seconds
	 */
	try {
		let stringArray = dummyTitleStr.split(" ");
		function getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
		let index = getRndInteger(0, stringArray.length);
		let title = stringArray[index];
		let article = {
			id,
			title,
		};
		let seconds = getRndInteger(0, 2000);
		const myPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(article);
			}, seconds);
		});
		return myPromise;
	} catch (error) {
		//console.log(error)
	}
}

let obj = getMockArticle(11).then((response) => {
	//console.log(response);
});

// Assume article ids as running numbers (1-10, 11-20 and so on)

const ArticleList = () => {
	/** --------- 2 -----------
	 * (i) Render a list of first 10 articles showing ID and title
	 * (ii) Render in sequence from top to bottom rather than randomly (as they would because of random timeouts)
	 * (iii) Add a next button that adds 10 more articles in the bottom. Can you use this to implement infinite scroll?
	 */
	return <div>Article List here</div>;
};

ReactDOM.render(<ArticleList />, document.getElementById("root"));
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// array.forEach(async(index)=>{
//  let object= await getMockArticle(index);
//   console.log(object);
// })

let promises = [];
array.forEach((index) => {
	promises.push(getMockArticle(index));
});
let ans = [];
let arr = [];
for (let j = 0; j < 10; j++) {
	for (let i = 0; i <= j; i++) {
		arr.push(promises[i]);
	}
	Promise.all(arr).then((values) => {
		// console.log(values);
		ans = values;
	});
	arr = [];
	// console.log(ans.length);
}
setTimeout(function () {
	console.log(ans);
}, 2000);

// Promise.all(promises).then((values) => {
//   console.log(values);
// });
