function display_form(){
    document.getElementById("edit-form").style.display="block";

    /*
    Alternative syntax to blur bg.
    document.querySelector('.blur').style.filter=`blur(${2}px)`;
   */
    document.getElementById('blur').style.filter=`blur(${2}px)`;
}