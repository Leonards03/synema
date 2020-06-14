// Library for building asynchronous javascript
import "regenerator-runtime";

// Utils
import "./script/utils/helper";
import "./styles/style.css";

// Components
import "./script/components/card";
import "./script/components/sidebar";
import "./script/components/detail-modal";
import "./script/components/item-slider";
import "./script/components/content-tabs";

// import main app.
import main from './script/view/main';

// Execute the main function when the DOM loaded
document.addEventListener("DOMContentLoaded", main);