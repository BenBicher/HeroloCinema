import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {
  closeResult: string;
  movies = [];
  selectedMovie;
  show: boolean = true;
  Title: string = "harry";
  TitleValidation = true;
  ReleasedValidation = true;
  RuntimeValidation = true;
  GenreValidation = true;
  DirectorValidation = true;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    fetch('https://www.omdbapi.com/?apikey=8029c9fc&s=' + this.Title)
      .then(response => response.json())
      .then(res => this.movies = res.Search);

  }

  showProp(m, content) {
    fetch('https://www.omdbapi.com/?apikey=8029c9fc&t=' + m)
      .then(response => response.json())
      .then(res => {
        this.selectedMovie = res
        this.selectedMovie.validation = true;
      })
    setTimeout(() => {
      this.modalService.open(content, { centered: true });
    }, 150);
  }

  edit() {
    this.show = !this.show;
  }

  AddNewMovie(newMovie) {
    this.modalService.open(newMovie, { centered: true });
  }

  removeMovie(value) {
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i]["Title"] == value) {
        if (confirm("Are you sure to delete " + value)) {
          this.movies.splice(i, 1);
          console.log('removed')
        }
      }
    }
  }

  valuechange() {
    this.selectedMovie.Title = this.selectedMovie.Title.replace(/[^a-zA-Z0-9 ]/g, "");

    for (let i = 1; i < this.movies.length; i++) {
      if (this.movies[i]["Title"] == this.selectedMovie.Title) {
        alert('This movie name is already exist');
        this.TitleValidation = false;
        return;
      }
    }

    if (this.selectedMovie.Title == null || this.selectedMovie.Title == "") {
      this.TitleValidation = false;
      alert('Please fill out this field');
      return;
    }
    if (this.selectedMovie.Released == null || this.selectedMovie.Released == "") {
      console.log("error");
      this.ReleasedValidation = false;
      alert('Please fill out this field');
      return;
    }
    if (this.selectedMovie.Runtime == null || this.selectedMovie.Runtime == ""
    || this.selectedMovie.Runtime == undefined) {
      this.RuntimeValidation = false;
      alert('Please fill out this field');
      return;
    }
    if (this.selectedMovie.Genre == null || this.selectedMovie.Genre == "") {
      this.GenreValidation = false;
      alert('Please fill out this field');
      return;
    }
    if (this.selectedMovie.Director == null || this.selectedMovie.Director == "") {
      this.DirectorValidation = false;
      alert('Please fill out this field');
      return;
    }
    else {
      this.selectedMovie.Runtime = this.selectedMovie.Runtime + ' min';
      this.TitleValidation = true;
      this.ReleasedValidation = true;
      this.RuntimeValidation = true;
      this.GenreValidation = true;
      this.DirectorValidation = true;
      this.show = !this.show;
    }
  }
}
