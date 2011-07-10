%lex

%%

\n+                                         return 'NEWLINE'
\s+                                         /* skip whitespace */
"layout:"(.+)                               return 'LAYOUT'
(.+)                                        return 'LINE'
<<EOF>>                                     return 'EOF'

/lex

%start Program

%%

Program
  : SourceElements
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
  | Whitespace
  | EOF { return yy.EOF(yy.file); }
  ;

Whitespace
  : NEWLINE {
      new yy.Newline(yy.file, ['NEWLINE', @1.first_line, $1]);
    }
  ;

Line
  : LINE {
      new yy.Line(yy.file, ['LINE', @1.first_line, $1]);
    }
  ;
