%lex

%%

\n+                                         return 'NEWLINE'
\s+                                         /* skip whitespace */
^"layout:"(.+)                              return 'LAYOUT'
(.+)                                        return 'LINE'
<<EOF>>                                     return 'EOF'

/lex

%start File

%%

File
  : /* empty */
  | File SourceElements
  ;

SourceElements
  : Layout
  | SourceElements Token
  ;

Layout
  : LAYOUT {
      new yy.Layout(yy.file, ['LAYOUT', @1.first_line, $1]);
    }
  ;

Token
  : Line
  | NEWLINE { new yy.Newline(yy.file, ['NEWLINE', @1.first_line, $1]); }
  | EOF { return yy.EOF(yy.file); }
  ;

Line
  : LINE {
      new yy.Line(yy.file, ['LINE', @1.first_line, $1]);
    }
  ;
