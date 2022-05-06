// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let mobilnet;
// A variable to hold the image we want to classify
let img;

function preload() {
  //allows any calls to finish before rendering the draw
  img = loadImage(
    // "images/bird.jpg"
    "https://images.unsplash.com/photo-1560813487-803cbe32d18b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2322&q=80"
    //"https://images.unsplash.com/photo-1516233758813-a38d024919c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
    // "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmlyZHxlbnwwfHwwfHw%3D&w=1000&q=80"
  );
  mobilnet = ml5.imageClassifier("MobileNet");
}

function setup() {
  let scale = 1.0;
  createCanvas(640, 480);
  imageMode(CENTER);
  // image(img, 0, 0, width, height);
  //image(img, 0, 0, width, (img.height * width) / img.width); // to fit width
  image(
    img,
    0.5 * width,
    0.5 * height,
    scale * width,
    (scale * img.height * width) / img.width
  ); // to fit width
  mobilnet.predict(img, gotResult);
}

// A function to run when we get the results or any errors
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  fill(255);
  textSize(34);
  text(results[0].label, 10, height - 90);
  text(
    results[0].confidence.toLocaleString("en", { style: "percent" }),
    10,
    height - 50
  );
  createDiv("Label: " + results[0].label);
  createDiv("Confidence: " + nf(results[0].confidence, 0, 2));
}
