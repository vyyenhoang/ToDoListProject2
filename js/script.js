// Total number of to-do items is tracked by currentItemNumber variable
// This variable is used to give an ID for the checkbox
var currentItemNumber = 0;

var itemInput = document.getElementById('item-input');
itemInput.focus();

var todoItems = document.querySelector('.todo-items .items');
var completedItems = document.querySelector('.completed-items');
var addButton = document.getElementById('add-btn');
addButton.addEventListener('click', function () {
	// value of the input item is trimmed to remove whitespaces
	// if there is some value in input item box, then we'll add
	// a checkbox, text and delete button to the list
	var itemText = itemInput.value.trim();
	if (itemText) {
		currentItemNumber = currentItemNumber + 1;

		//set priority element for Creative mark
		var priority = document.querySelector('input[name="priority"]:checked').value;

		var item = document.createElement('li');
		item.classList.add(priority);
		item.innerHTML =
			'<input type="checkbox" id="item-' + currentItemNumber + '"> ' +
			'<label for="item-' + currentItemNumber + '">' + itemText + '</label> ' +
			'<button class="delete-btn">Delete</button>';
		todoItems.appendChild(item);

		// 'change' eventListener is added to newly created item checkbox
		document.getElementById('item-' + currentItemNumber).addEventListener('change', function () {
			if (this.checked) {
				var id = this.getAttribute('id');
				// load ding sound and play it
				(new Audio('audio/ding.mp3')).play();
				
				// disable the checkbox so it cannot be unchecked
				this.setAttribute('disabled', 'disabled');
				
				// move this item to the bottom of the list
				var item = document.createElement('li');
				item.className = this.parentElement.className;
				item.innerHTML = this.parentElement.innerHTML;
				this.parentElement.remove();
				completedItems.appendChild(item);

				// add fade-to-green effect
				setTimeout(function () {
					item.classList.add('completed');
				}, 1);
			}
		});

		// itemInput is cleared and focus is given back to it
		itemInput.value = '';
		itemInput.focus();
	}

});

// A 'click' eventListener is added to body
// We're checking if any delete button is clicked
// If yes, we'll remove the associated to-do item
document.body.addEventListener('click', function (event) {
	if (event.target.className === 'delete-btn') {
		event.target.parentElement.classList.add('deleted');
		setTimeout(function () {
			event.target.parentElement.remove();
		}, 1000);
	}
});
