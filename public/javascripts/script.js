// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector("#myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
];

var options = {
  debug: 'info',
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Tell your story...',
  readOnly: false,
  theme: 'snow'
};
var editor = new Quill('#editor', options);

function formatField(){
  // var editor = document.querySelector(".ql-editor").contentEditable = false;
  // var clipboard = document.querySelector(".ql-clipboard").contentEditable = false;
  // var bar = document.querySelector("input[type=text]").type="hidden"
  var p = document.querySelector("#editor");
  var myInput = document.querySelector("input[name=body]");
  myInput.value = p.innerHTML;
}
