Result from actual experiments:

```
w v r h m k g o u ;
l s n d f p t i a e
q b j y x z c

x v w h l k g o u ;
r s n d f p t i a e
q b m y j z c

w k r h m q g o u ;
l s n d f p t i a e
v b j y x z c

x k w h m q g u o ;
r s n d f p t i a e
v b l y j z c

x w r h m k g o u ;
l s n d f p t i a e
q v b y j z c
```

Learnings:
* slight different data from the experiment will cause huge difference of the
  keyboard layout.
* putting all the vowels at the upper right corner seems to be a very good
  practice, because the vowels will appear in all the words, and they will
  always be combined with other consonances. To put them at the upper right
  corner can make most of the consonance-vowel-combinations separated to
  different hands, which ensures the lowest rate of pressing a combination
  with once single finger.
* the algorithm is to find the overall lowerest typing lattency. But my goal
  with this layout is to make the typing of a word with lowest rate of pressing
  a combination with the same finger twice in a roll.
* there are a lot of details that I'm not satisfied with the generated layout,
  e.g. "ck" being used by a lot of words like "click", "back", "block",
  "quick", is being put at "m"- and "y"- position. Another example is "rn",
  being used by a lot of words like "internal", "afternoon", "learn", is being
  put to "e"- and "d"-position.
  
So the goal of the next step should be rather try to find a layout with as low
interconnection within the range of a single finger as much as possible.

If I generate the lowest interconnected clusters from the key combinations, the
result will be:

```
i; oe vu ypgwcf dkmbtj lhn srz qxa

|| q | s | l | d k || y p | o | v | i ||
|| x | r | h | m b || g w | e | u | ; ||
|| a | z | n | t j || c f |
```

Based on this, if I want to move a key, I can only move it within a
"finger-column", and I can rearrange the finger-columns, as long as the number
of the keys are the same.

The mostly used keys shall be put on the home-row, and for the index finger 
columns, the most frequently used keys shall be put around the home position.
For the 3 finger columns at the left hand side, I will calculate the
interconnection between the keys. And the cluster with most interconnection
will be put on the middle finger row, because my middle finger is more flexible
than other fingers.

According to these rules, the final keyboard layout design is:

```
x r h b j p f o v ;
 a s n t m w g e u i
  q z l d k y c
```

After some iterations, the final design of the keyboard has become like this:

```
x r h w p j k o v ;
 a s n g y b t e u i
  q z l c f m d 
```
