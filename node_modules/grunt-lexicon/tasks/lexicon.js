/*
 * grunt-lexicon
 * https://github.com/kates/grunt-lexicon
 *
 * Copyright (c) 2012 kates
 * Licensed under the MIT license.
 */
var path = require('path'),
  fs = require('fs'),
  lexicon = require('lexicon'),
  parser = lexicon.parser,
  formatter = lexicon.formatter,
  rimraf = require('rimraf'),
  marked = require('marked');

module.exports = function(grunt) {
  var formatExts = {
    markdown: '.md',
    json: '.json',
    html: '.html'
  };

  function findIndex(fPath) {
    var paths = fPath.split(path.sep),
      up = [];
    paths.pop();
    for (var i = 0; i < paths.length - 1; i++) {
      up.push("..");
    }
    return up.join(path.sep);
  }
  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('lexicon', 'Your task description goes here.', function() {

    var files = grunt.file.expand({filter: 'isFile'}, this.files[0].src),
      dest = this.files[0].dest,
      options = this.options() || {},
      format = options.format || 'html',
      title = options.title || 'API',
      assetsPath = path.resolve(__dirname, '..', 'assets'),
      tplName = format === 'html' ? 'html.tpl' : 'md.tpl',
      tpl = fs.readFileSync(path.resolve(assetsPath, tplName), 'utf-8'),
      util = grunt.util;

    if (format === 'html') {
      var pageTpl = fs.readFileSync(path.resolve(assetsPath, 'page.tpl'), 'utf-8'),
        indexTpl = fs.readFileSync(path.resolve(assetsPath, 'index.tpl'), 'utf-8'),
        cssFile = fs.readFileSync(path.resolve(assetsPath, 'bootstrap.css'), 'utf-8'),
        jsFile = fs.readFileSync(path.resolve(assetsPath, 'script.js'), 'utf-8');
    }


    if (!/markdown|json|html/.test(format)) {
      format = 'html';
    }

    rimraf.sync(dest);
    var toc = [];

    util.async.forEach(files, function(file, done) {
      var code = grunt.file.read(file, 'utf-8').toString(),
        ast = parser.parse(code),
        doc = format === 'html' ? ast : formatter.format(ast, format == 'json' ? 'json' : 'markdown'),
        filePath = dest + path.sep + file + formatExts[format],
        indexPath = findIndex(filePath),
        cssFilePath = indexPath + path.sep + 'bootstrap.css',
        indexFilePath = indexPath + path.sep + 'index.html',
        jsFilePath = indexPath + path.sep + 'script.js',
        funcs = [];

      ast.forEach(function(func) {
        func['function'] && funcs.push(func['function']);
      });

      if (/markdown|html/.test(format)) {
        var data = {
          title: title,
          body: doc,
          file: file,
          indexFile: indexFilePath,
          cssFile: cssFilePath,
          jsFile: jsFilePath,
          marked: marked
        };

        data = {data: data};
        doc = grunt.template.process(tpl, data);

        if (format === 'html') {
          data = {
            content: doc,
            title: title,
            cssFile: cssFilePath,
            jsFile: jsFilePath
          };

          data = {data: data};
          doc = grunt.template.process(pageTpl, data);

          toc.push({
            path: file + formatExts[format],
            target: file,
            funcs: funcs || []
          });
        }
      }
      grunt.file.write(filePath, doc);
      done(null);
    }, function(err) {
      if (!err && format === 'html') {
        var data = {
          title: title,
          toc: toc
        };
        data = {data: data};

        var out = marked.parse(grunt.template.process(indexTpl, data));

        data = {
          content: out,
          title: title,
          cssFile: './bootstrap.css',
          jsFile: './script.js'
        };
        data = {data: data};

        out = grunt.template.process(pageTpl, data);

        grunt.file.write(path.resolve(dest, 'index.html'), out);
        grunt.file.write(path.resolve(dest, 'bootstrap.css'), cssFile);
        grunt.file.write(path.resolve(dest, 'script.js'), jsFile);
      }
    });
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================
};
