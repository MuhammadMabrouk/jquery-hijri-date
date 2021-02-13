# jquery-hijri-date

A small jQuery plugin to display Hijri date.


### Install

```sh
$ npm install jquery-hijri-date --save
```

or

```html
<!-- jquery file -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- jquery-hijri-date file -->
<script src="jquery.hijri.date.min.js"></script>
```

### Examples:

```html
<!-- date will be displayed here -->
<div class="my-date"></div>
```

```javascript
$('.my-date').hijriDate();
```

![alt text](https://drive.google.com/uc?export=view&id=1acAq1lCl4q2e1rvGAxkdVonKLi5Nh4G7 "Hijri Date Only")

If you want to display the Gregorian date as well, pass `{gregorian: true}` as follows:

```javascript
$('.my-date').hijriDate({gregorian: true});
```

![alt text](https://drive.google.com/uc?export=view&id=18AWj3ZtZ6c56mN9yqkx2zAjJss1sWvjv "Hijri and Gregorian Date")

### License

ISC
