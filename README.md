## Resume

Since the resume will need to be updated in a regular basis, a markdown resume file exists in `assets` folder. Also within `assets/css` folder is a `resume-stylesheet.css` to style the resume.

Using tool [pandoc](https://pandoc.org/), the markdown file (along with the css file) can be converted to an html file. Use command `pandoc assets/resume.md -f markdown -t html -c assets/css/resume-stylesheet.css -s -o resume.html` to create the `resume.html` file. 

Instead of typing the command every time I update my resume, I've created a shell script file `resume.sh` which I can call to update the resume.