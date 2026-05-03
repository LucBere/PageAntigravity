import fs from 'fs';
const data = JSON.parse(fs.readFileSync('C:/Users/lucas/.mcp-figma/cache/file_nodes_f3edrvlpqp5CiRQ85jFlez_1777476630378.json', 'utf8'));
const canvas = data.nodes['184:8'].document;

function extractNodes(node, depth = 0) {
  let result = '';
  const indent = '  '.repeat(depth);
  if (node.type === 'TEXT') {
    result += `${indent}- TEXT: "${node.characters}"\n`;
  } else if (node.type === 'FRAME' || node.type === 'INSTANCE' || node.type === 'COMPONENT') {
    result += `${indent}- [${node.type}] ${node.name}\n`;
    if (node.children) {
      node.children.forEach(child => {
        result += extractNodes(child, depth + 1);
      });
    }
  } else if (node.type === 'RECTANGLE' || node.type === 'VECTOR' || node.type === 'ELLIPSE') {
    if (node.name.toLowerCase().includes('button') || node.name.toLowerCase().includes('input')) {
      result += `${indent}- [${node.type}] ${node.name}\n`;
    }
  }
  return result;
}

let output = '';
canvas.children.forEach(screen => {
  output += `\n\n=== SCREEN: ${screen.name} ===\n`;
  output += extractNodes(screen);
});

fs.writeFileSync('figma_screens.txt', output);
console.log('Done');
