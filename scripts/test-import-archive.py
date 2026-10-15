#!/usr/bin/env python3
"""Offline regression tests: python3 scripts/test-import-archive.py."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('archive', Path(__file__).with_name('import-archive.py'))
archive = importlib.util.module_from_spec(spec)
spec.loader.exec_module(archive)


class FakeMedia:
    def local(self, url):
        return '/media/writing/example.webp' if url.endswith('/example.png') else None


class ImportTests(unittest.TestCase):
    def convert(self, source, lang='en'):
        return archive.convert(source, 'https://example.org/post', FakeMedia(), lang)

    def test_pre_indentation_and_literal_tags(self):
        result = self.convert('<pre>if x &lt; 2:\n    print(&quot;&lt;sample&gt;&quot;)<br/>\n    return x</pre>')
        self.assertIn('if x < 2:\n    print("<sample>")\n\n    return x', result)
        self.assertIn('```', result)

    def test_strip_active_content_and_unsafe_urls(self):
        result = self.convert('<p onclick="evil()">Keep this</p><script>evil()</script><style>body{}</style><a href="javascript:evil()">text</a><iframe src="https://www.youtube.com/embed/example"></iframe>')
        self.assertIn('Keep this', result)
        self.assertIn('https://www.youtube.com/embed/example', result)
        for unsafe in ('evil', 'javascript:', '<script', '<iframe', 'onclick', 'body{}'):
            self.assertNotIn(unsafe, result)

    def test_images_local_and_missing_are_explicit(self):
        result = self.convert('<img src="/example.png" alt="Chart"><img src="/missing.png" alt="Missing chart"><img src="file:///tmp/not-recoverable.png">')
        self.assertIn('src="/media/writing/example.webp"', result)
        self.assertIn('alt="Chart"', result)
        self.assertIn('Original image unavailable', result)
        self.assertIn('https://example.org/missing.png', result)
        self.assertNotIn('file://', result)
        self.assertIn('unavailable local images', result)

    def test_quotes_attribution_and_tables(self):
        result = self.convert('<blockquote><p>A quotation — Original author</p></blockquote><table><tr><th>Hz</th></tr><tr><td>440</td></tr></table>')
        self.assertIn('> A quotation — Original author', result)
        self.assertIn('| Hz', result)
        self.assertIn('440', result)

    def test_span_spacing_in_legacy_code(self):
        result = self.convert('<pre>for i in data:<br/><span>    print(i)</span></pre>')
        self.assertIn('for i in data:\n    print(i)', result)

    def test_slugs_and_frontmatter_are_stable(self):
        self.assertEqual(archive.slug('ArtisanLabs_arouse_en'), 'artisanlabs-arouse-en')
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            meta = {'id': 'example', 'title': '¿Título: prueba?', 'date': '2008-05-27', 'lang': 'es', 'description': 'Summary', 'series': 'example', 'originalUrl': 'https://example.org/post'}
            archive.save(root, meta, 'Body\n', 'original-id')
            first = (root / 'example.md').read_bytes()
            archive.save(root, meta, 'Body\n', 'original-id')
            self.assertEqual(first, (root / 'example.md').read_bytes())
            self.assertEqual(meta['id'], 'example')

    def test_artisan_tracking_removed_and_video_kept(self):
        source = '[![Twitter URL](https://img.shields.io/example)](https://twitter.com/example)\n<video width="640" height="480" controls><source src="/assets/blog/example.png"></video><script src="https://platform.twitter.com/widgets.js"></script>\n[ArtisanLabs](artisanlabs.io)'
        result = archive.artisan_markdown(source, FakeMedia())
        self.assertNotIn('shields.io', result)
        self.assertNotIn('<script', result)
        self.assertIn('<video controls playsinline preload="none">', result)
        self.assertIn('/media/writing/example.webp', result)
        self.assertIn('https://artisanlabs.io', result)

    def test_failed_media_is_recorded_without_publishing_html(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            media = archive.Media(root / 'cache', root / 'output', root / 'artisan')
            url = 'https://example.org/old-logo.jpg'
            (root / 'cache' / archive.sha(url.encode())[:16]).write_text('<html>Site no longer exists</html>')
            self.assertIsNone(media.local(url))
            self.assertEqual(media.records[url]['status'], 'unavailable')
            self.assertEqual(list((root / 'output').iterdir()), [])

    def test_local_image_optimization_is_deterministic(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            media = archive.Media(root / 'cache', root / 'output', root / 'artisan')
            url = 'https://example.org/chart.png'
            cache = root / 'cache' / archive.sha(url.encode())[:16]
            archive.Image.new('RGB', (40, 20), color='white').save(cache, format='PNG')
            local = media.local(url)
            self.assertTrue(local.endswith('.webp'))
            output = (root / 'output' / Path(local).name).read_bytes()
            self.assertEqual(media.records[url]['localSha256'], archive.sha(output))
            other = archive.Media(root / 'cache', root / 'other', root / 'artisan')
            self.assertEqual(other.local(url), local)
            self.assertEqual((root / 'other' / Path(local).name).read_bytes(), output)

    def test_summary_ignores_scripts(self):
        self.assertEqual(archive.plain('<p>Original text</p><script>unwanted()</script>'), 'Original text')

    def test_personal_contact_redaction_preserves_author(self):
        self.assertEqual(archive.redact_contacts('Sebastian Rojo arpagon@gamil.com'), 'Sebastian Rojo @arpagon')


if __name__ == '__main__':
    unittest.main()
