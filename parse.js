(function(){
  var fs, async, md, Sequelize, files, notFound, regexps, counter, result, e, lines, i$, len$, line, j$, len1$, regexp, page, prev, ref$, dir, file, md_data, html_data, final_data, api, link_1st, link_2nd, full_results, obj, objectify, seq, SearchIndex;
  fs = require('fs');
  async = require('async');
  md = require("marked");
  Sequelize = require("sequelize");
  files = ["API-reference"];
  notFound = [];
  regexps = [/\[\[(.*?)\|(.*?)(#(.*))?\]\]/, /\[(.*?)\]\((.*?)(#(.*))?\)/];
  seq = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'Famous.docset/Contents/Resources/docSet.dsidx'
  });
  SearchIndex = seq.define('searchIndex', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    path: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  SearchIndex.sync().success(function(){
    var key, ref$, items, lresult$, i$, len$, item, si, results$ = [];
    for (key in ref$ = obj) {
      items = ref$[key];
      lresult$ = [];
      for (i$ = 0, len$ = items.length; i$ < len$; ++i$) {
        item = items[i$];
        si = SearchIndex.build({
          name: item.name,
          type: key,
          path: item.path
        });
        lresult$.push(si.save());
      }
      results$.push(lresult$);
    }
    return results$;
  });
  
}).call(this);
