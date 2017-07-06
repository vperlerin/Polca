var gulp    = require('gulp'), 
    sass    = require('gulp-ruby-sass'), 
    notify  = require("gulp-notify"), 
    bower   = require('gulp-bower'),
    uglify  = require('gulp-uglify'),
    concat = require('gulp-concat'), 
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename');  

var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components',
     jsPath:'./resources/js',
     imgPath:'./resources/img'
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});


gulp.task('images', function() { 
    return gulp.src(config.imgPath + '/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img')); 
});


gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/*.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 "resources/sass/caroussel.scss", 
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
                 "resources/sass/checkboxes.scss",
                 "resources/sass/shared.scss", 
                
             ]
         }) 
         .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
         }))) 
         
         .pipe(concat('style.css'))
         .pipe(gulp.dest('./public/css')); 
});


gulp.task('js', function() {
  return gulp.src([config.bowerDir + '/bootstrap/dist/js/bootstrap.js',config.jsPath + '/*.js']) 
         .pipe(concat('main.min.js'))
         .pipe(gulp.dest('./public/js')) 
         .pipe(uglify())
           .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
         })) 
         .pipe(gulp.dest('./public/js'));
 });  
    
     



// Rerun the task when a file changes
gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
     gulp.watch(config.jsPath + '/**/*.js', ['js']); 
     gulp.watch(config.imgPath + '*', ['images']); 

});

gulp.task('default', ['bower', 'icons', 'css','js','images']);