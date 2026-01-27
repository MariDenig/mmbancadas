# MM Revestimentos - Site de Vendas

Um site estático moderno e elegante para a empresa MM Revestimentos, desenvolvido com HTML5, CSS3 e JavaScript puro.

## 🎨 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Paleta de Cores**: Preto e dourado para um visual sofisticado
- **Carrossel Interativo**: Slides automáticos com controles manuais
- **Galeria de Produtos**: Seções organizadas para cada tipo de serviço
- **Links de Contato**: WhatsApp e Instagram integrados
- **Animações Suaves**: Efeitos visuais modernos
- **SEO Otimizado**: Estrutura semântica e meta tags

## 📁 Estrutura do Projeto

```
MMbancadas/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interativo
└── README.md           # Este arquivo
```

## 🚀 Como Usar

1. **Abra o arquivo `index.html`** em qualquer navegador moderno
2. O site carregará automaticamente com todas as funcionalidades

## ⚙️ Personalização

### 📞 Informações de Contato

Substitua os números de telefone e links nas seguintes seções:

**WhatsApp:**
- Procure por `5511999999999` e substitua pelo número real
- Formato: `5511XXXXXXXXX` (código do país + DDD + número)

**Instagram:**
- Procure por `mmrevestimentos` e substitua pelo perfil real
- Formato: `https://instagram.com/seuperfil`

**Telefone:**
- Procure por `+5511999999999` e substitua pelo número real

### 🖼️ Imagens

**Para substituir as imagens:**

1. **Carrossel Principal** (linhas 32, 42, 52):
   ```html
   <img src="URL_DA_SUA_IMAGEM" alt="Descrição">
   ```

2. **Galeria de Bancadas** (linhas 75, 85, 95):
   ```html
   <img src="URL_DA_SUA_IMAGEM" alt="Descrição">
   ```

3. **Galeria de Lavatórios** (linhas 115, 125, 135):
   ```html
   <img src="URL_DA_SUA_IMAGEM" alt="Descrição">
   ```

4. **Galeria de Revestimentos** (linhas 155, 165, 175):
   ```html
   <img src="URL_DA_SUA_IMAGEM" alt="Descrição">
   ```

5. **Equipe** (linhas 195, 205, 215):
   ```html
   <img src="URL_DA_SUA_IMAGEM" alt="Descrição">
   ```

### 👥 Informações da Equipe

Edite as informações dos membros da equipe nas linhas 196-217:

```html
<div class="team-member">
    <img src="foto.jpg" alt="Nome">
    <h3>Nome Completo</h3>
    <p>Cargo/Função</p>
    <!-- Links sociais -->
</div>
```

### 🎨 Cores

As cores estão definidas no arquivo `styles.css` nas variáveis CSS (linhas 6-14):

```css
:root {
    --primary-black: #000000;      /* Preto principal */
    --secondary-black: #1a1a1a;    /* Preto secundário */
    --primary-gold: #d4af37;       /* Dourado principal */
    --secondary-gold: #b8860b;     /* Dourado secundário */
    --light-gold: #f4e4bc;         /* Dourado claro */
    --white: #ffffff;              /* Branco */
    --gray: #f5f5f5;               /* Cinza claro */
    --dark-gray: #333333;          /* Cinza escuro */
}
```

### 📝 Textos

**Títulos das Seções:**
- Bancadas de Cozinha (linha 68)
- Lavatórios de Banheiro (linha 108)
- Revestimentos de Edículas e Área Gourmet (linha 148)
- Nossa Equipe (linha 188)
- Entre em Contato (linha 228)

**Descrições dos Produtos:**
- Edite os textos nas `gallery-overlay` de cada seção
- Modifique os títulos e descrições conforme necessário

## 🔧 Funcionalidades

### Carrossel
- **Automático**: Muda a cada 5 segundos
- **Controles**: Botões de navegação e pontos indicadores
- **Teclado**: Setas esquerda/direita para navegar
- **Pausa**: Para quando o mouse está sobre o carrossel

### Navegação
- **Smooth Scroll**: Rolagem suave entre seções
- **Header Fixo**: Menu sempre visível no topo
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

### Galeria
- **Hover Effects**: Animações ao passar o mouse
- **Overlay**: Informações aparecem sobre as imagens
- **Links Diretos**: WhatsApp integrado em cada produto

### Contato
- **WhatsApp**: Links diretos com mensagens pré-definidas
- **Instagram**: Redirecionamento para o perfil
- **Telefone**: Ligação direta

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🚀 Hospedagem

Para publicar o site:

1. **GitHub Pages** (Gratuito):
   - Faça upload dos arquivos para um repositório GitHub
   - Ative GitHub Pages nas configurações

2. **Netlify** (Gratuito):
   - Arraste a pasta do projeto para o Netlify
   - O site será publicado automaticamente

3. **Vercel** (Gratuito):
   - Conecte seu repositório GitHub
   - Deploy automático a cada atualização

4. **Hospedagem Tradicional**:
   - Faça upload dos arquivos via FTP
   - Acesse através do domínio

## 🔍 SEO

O site inclui:

- **Meta Tags**: Título, descrição, viewport
- **Estrutura Semântica**: HTML5 com tags apropriadas
- **Alt Text**: Descrições para imagens
- **URLs Amigáveis**: Links internos organizados

## 📞 Suporte

Para dúvidas ou personalizações adicionais:

1. **Edite os arquivos** conforme as instruções acima
2. **Teste localmente** antes de publicar
3. **Verifique responsividade** em diferentes dispositivos

## 🎯 Próximos Passos

Sugestões para melhorias futuras:

- [ ] Adicionar formulário de contato
- [ ] Integrar com Google Analytics
- [ ] Adicionar mais seções de produtos
- [ ] Implementar blog/notícias
- [ ] Adicionar depoimentos de clientes
- [ ] Integrar com redes sociais

---

**Desenvolvido com ❤️ para MM Revestimentos** 