A node.js interpreter for the Scheme programming language.

Inspired by Peter Norvig's articles describing a scheme interpreter implemented with Python.

[(How to Write a (Lisp) Interpreter (in Python))](https://norvig.com/lispy.html)
[(An ((Even Better) List) Interpreter (in Python))](https://norvig.com/lispy2.html)

I don't plan on targeting any specific Scheme standard at this point, but the overall intent
is to provide an interpreter that can be used while reading through [Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sites/default/files/sicp/index.html).

Todo List:

## Basics
* Implement proper literal expressions: `quote`, `'`
* Deal with empty combinations (i.e. `()`), this is not a valid expression in Scheme

## Lambdas and Procedures
* Raise an error if a parameter name is repeated in a `lambda` or `define` expression.
* Procedures created by `lambda` need to have a storage location tag so that `eqv?` and `eq?` work on procedures
* Need to implement `let`, `let*`, and `letrec`

## Conditionals
* The result of an `if` which has a false test and no alternate is unspecified, we will raise an error.
* Need to implement the `case` expression

## Iteration
* Need to implement `do`.

## Others
* Delayed evaluation and quasiquotation are not high on my list of priorities but they will be added at some point.