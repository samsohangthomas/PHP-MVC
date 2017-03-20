<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html> 
  <head>
    <style>
      table{
        width:100%;
      }
      table th,td{
        padding:5px;
      }

    </style>
  </head>
<body>
  <h2>Latest Post</h2>
  <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">ID</th>
      <th style="text-align:left">Author</th>
      <th style="text-align:left">Comment</th>
      <th style="text-align:left">Category</th>
      <th style="text-align:left">Image</th>
      <th style="text-align:left">Link</th>
      <th style="text-align:left">Date</th>
    </tr>
    <xsl:for-each select="blogs/blog">
    <tr>
      <td><xsl:value-of select="id"/></td>
      <td><xsl:value-of select="author"/></td>
      <td><xsl:value-of select="comment"/></td>
      <td><xsl:value-of select="category"/></td>
      <td>
        <xsl:element name="img">
              <xsl:attribute name="src">
                <xsl:value-of select="image"/>
              </xsl:attribute>
              <xsl:attribute name="width">100px</xsl:attribute>
            </xsl:element>
      </td>
      <td><xsl:value-of select="link"/></td>
      <td><xsl:value-of select="date"/></td>
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>

