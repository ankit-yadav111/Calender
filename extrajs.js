oo=document.getElementById("formGroupExampleInput");

function openModal() {
  var modalOverlay = document.getElementById('exampleModalCentered');
  modalOverlay.style.display = 'block';

  window.onclick = function(event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  };
}

// Function to close the modal
function closeModal() {
  var modalOverlay = document.getElementById('exampleModalCentered');
  oo.value="";
  modalOverlay.style.display = 'none';
}

function saveData(){
  alert("Data is Saved");
  // After saving the data close the modal
  closeModal();
}