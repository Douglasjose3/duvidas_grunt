module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //recebe objeto de configuração
        less: { //configuração do less
            development: { //criar funções diferentes
                files: {
                    'dev/styles/style.css': 'src/styles/style.less' //arquivo pasta/nome destino.css e pasta/nome origem.less
                }
            },
            production: { //ambiente de produção
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/style.min.css': 'src/styles/style.less' //arquivo pasta/nome destino.css e pasta/nome origem.less (arquivo minificado)
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'], 
                tasks: ['less:development'] //** acessa qualquer pasta /* acessa os arquivos
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', //colocar essa array no html
                            replacement: '/styles/style.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '/src/scripts/script.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', //colocar essa array no html
                            replacement: '/dist/styles/style.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '/src/scripts/script.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html'  //minificação
                    //substituição
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/script.min.js': './src/scripts/script.js'
                } 
            }
        }
    })

    //carregando os plugins
    grunt.loadNpmTasks('grunt-contrib-less'); 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']); //trocar ['less:development'] por ['watch']
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']); //configuração para rodar somente no ambiente de produção
}