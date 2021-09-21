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

<br>

**1- Default:**
```javascript
$('.my-date').hijriDate();
```

![alt text](https://drive.google.com/uc?export=view&id=1ZrjM9_FlGJeP2mUpKjm0-cr64JNsKC0a "Hijri Date Default")

### Options:
| Prop | Type | Description | Default |
| ----------- |    :----:   | ----------- |    :----:   |
| showWeekDay | `boolean` | Set to `true` or `false` to show or hide the day of the week. | `true` |
| showGregDate | `boolean` | Set to `true` or `false` to show or hide the Gregorian date. | `false` |
| separator | `string` | The separator symbol that appears between the Hijri and Gregorian dates. | `'-'` |
| weekDayLang | `'ar'` &#124; `'en'` | Determine the language for printing the day of the week. | `'ar'` |
| hijriLang | `'ar'` &#124; `'en'` | Determine the language for printing the Hijri date. | `'ar'` |
| gregLang | `'ar'` &#124; `'en'` | Determine the language for printing the Gregorian date. | `'ar'` |
| correction | `number` | Add or subtract one or more days until you get the correct date. | `0` |

<br>

**2- Customized:**
```javascript
$('.my-date').hijriDate({
  showWeekDay: true,
  showGregDate: true,
  separator: '&nbsp;|&nbsp;',
  weekDayLang: 'en',
  hijriLang: 'en',
  gregLang: 'en',
  correction: +1
});
```

<br>

![alt text](https://drive.google.com/uc?export=view&id=1dcGBZ3ku06dugh0Qj4RkBaaIBpAdlHG_ "Customized")

<br><br>

### License

ISC
